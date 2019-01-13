<template>
    <div class="h-hundred-percent">
        <chart :options="chartOption" ref="quantity" @click="chartClick" auto-resize/>
        <chart-change-size :title="title" :size="size" @sizeChange="sizeChange"/>
    </div>
</template>
<script>
  import allColors from '@/utils/styleUtil';
	import {formatInt} from '@/filters';
	import chartChangeSize from '@/components/ChartChangeSize.vue';

	export default {
		data() {
			return {
				size: 10,
				title: '专业市场档口数量排名前',
				mappingStart: {
					10: 0,
					20: 50,
					30: 68,
					40: 76,
					50: 82
				},
				chartOption: {
					color: ['#B08CBA'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						top: '30',
						left: '10',
						right: '50',
						bottom: '5',
						containLabel: true
					},
					xAxis: {
						name: '家',
						nameTextStyle: {
							color: allColors.textColor
						},
						type: 'value',
						splitLine: {
							show: false
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: allColors.textColor
							}
						},
						axisLine: {
							lineStyle: {
								color: allColors.textColor,
								width: 2
							}
						}
					},
					dataZoom: [{
						type: 'slider',
						show: true,
						yAxisIndex: [0],
						width: 20,
						start: 30,
						end: 100,
						bottom: 55
					}],
					yAxis: {
						type: 'category',
						splitLine: {show: false},
						data: ['-'],
						axisLabel: {
							show: true,
							interval: 0,
							textStyle: {
								color: allColors.textColor,
								fontSize: 12
							}
						},
						axisLine: {
							lineStyle: {
								color: allColors.textColor,
								width: 2
							}
						}
					},
					series: [{
						name: '档口数量',
						type: 'bar',
						barWidth: '70%',
						data: [],
						itemStyle: {
							normal: {
								label: {
									show: true,
									position: 'outer',
									formatter: function (param) {
										return param.data.name;
									},
									textStyle: {color: allColors.textColor}
								}
							}
						}
					}]
				}
			}
		},
		components: {
			chartChangeSize
		},
		methods: {
			chartClick(params) {
				this.$emit('click', params);
			},
			sizeChange(size) {
				this.$emit('sizeChange', size)
			},
			setOption: function (seriesData, Count) {
				this.$refs.quantity.mergeOptions({
					xAxis: {name: '家'},
					yAxis: {
						data: seriesData.map((item, index) => {
							return index + 1;
						}).reverse()
					},
					dataZoom: {
						start: this.mappingStart[Count]
					},
					tooltip: {
						formatter: function (params) {
							let strArr = [];
							params.forEach((item) => {
								strArr.push(item.data.name);
								strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatInt(item.data.value) + '家');
							});
							return strArr.join('<br>');
						}
					},
					series: [{
						name: '档口数量',
						data: seriesData
					}]
				})
			}
		}
	}
</script>
