<template>
    <div class="h-hundred-percent">
        <chart :options="chartOption" ref="tax" auto-resize @click="chartClick"/>
        <chart-change-size :title="title" :size="size" @sizeChange="sizeChange"/>
    </div>
</template>
<script>
  import allColors from '@/utils/styleUtil';
	import {formatAmount} from '@/filters';
	import chartChangeSize from '@/components/ChartChangeSize.vue';

	export default {
		data() {
			return {
				size: 10,
				title: '村集体工业区税收前',
				mappingStart: {
					10: 0,
					20: 50,
					30: 68,
					40: 76,
					50: 82
				},
				chartOption: {
					title: {
						text: '',
						x: 'center',
						y: 'bottom',
						textStyle: {
							color: allColors.textColor,
							fontSize: 15,
							fontWeight: 700
						}
					},
					color: ['#FA7698'],
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
						name: '平方米',
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
					dataZoom: [
						{
							type: 'slider',
							show: true,
							yAxisIndex: [0],
							bottom: 55,
							width: 20,
							start: 30,
							end: 100
						}
					],
					yAxis: {
						name: '排名',
						nameLocation: 'start',
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
					series: [
						{
							name: '税收总额',
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
						}
					]
				}
			}
		},
		components: {
			chartChangeSize
		},
		methods: {
			chartClick(params) {
				this.$emit('click', params)
			},
			sizeChange(size) {
				this.$emit('sizeChange', size)
			},
			setOption(seriesData, unit, Count) {
				this.$refs.tax.mergeOptions({
					xAxis: {name: unit},
					yAxis: {
						data: seriesData.map((item, index) => {
							return index + 1;
						}).reverse()
					},
					tooltip: {
						formatter: function (params) {
							var strArr = [];
							params.forEach((item) => {
								strArr.push(item.data.name);
								strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.data.value) + unit || '');
							});
							return strArr.join('<br>');
						}
					},
					dataZoom: {start: this.mappingStart[Count]},
					series: [{
						name: '税收总额',
						data: seriesData
					}]
				})
			}
		}
	}
</script>
