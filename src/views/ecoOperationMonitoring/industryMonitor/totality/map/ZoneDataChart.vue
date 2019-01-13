<template>
    <chart :options="chartOption" name="zone" ref="zone" @click="chartClick"
           @legendselectchanged="legendselectchanged" auto-resize/>
</template>
<script>
	import {formatAmount} from '@/filters';;
  import allColors from '@/utils/styleUtil';

	export default {
		props: {
			showButton: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				chartOption: {
					title: {
						text: '街镇产值排名',
						x: 'center',
						y: 'bottom',
						textStyle: {
							color: allColors.textColor,
							fontSize: 15,
							fontWeight: 700
						}
					},
					legend: {
						textStyle: {
							color: allColors.textColor,
						},
						itemWidth: 10,
						itemHeight: 10,
						itemGap: 3,
						top: 'top',
						left: 'center',
						data: []
					},
					dataZoom: [
						{
							type: 'slider',
							show: true,
							yAxisIndex: [0],
							width: 20,
							top: 65,
							start: 45,
							end: 100,
							showDetail: false
						}
					],
					color: ['#EB51A7', '#3398DB', '#FF5554', '#FD9811'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						top: '30',
						left: '5',
						right: '60',
						bottom: '25',
						containLabel: true
					},
					xAxis: {
						name: '万',
						nameTextStyle: {
							color: allColors.textColor
						},
						position: 'top',
						type: 'value',
						splitLine: {show: false},
						axisLabel: {
							show: true,
							interval: 0,
							textStyle: {
								color: allColors.textColor
							}
						},
					},
					yAxis: {
						type: 'category',
						data: ['-'],
						nameTextStyle: {
							color: allColors.textColor
						},
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
					series: []
				}
			}
		},
		methods: {
			legendselectchanged(params) {
				this.$emit('legendselectchanged', params);
			},
			chartClick(params) {
				this.$emit('click', params);
			},
			goToChart() {
				this.$emit('goBack');
			},
			setChartOption: function (item, seriesName) {
				let unit = item.seriesData && item.seriesData.length > 1 && item.seriesData[0].unit;

				for (let i = 0; i < item.seriesData.length; i++) {
					item.seriesData[i] = Object.assign({}, item.seriesData[i], {
						type: 'bar',
						stack: '总量',
						barWidth: '80%'
					});
				}
				this.$refs.zone.mergeOptions({
					title: {text: "街镇" + seriesName + "排名"},
					series: item.seriesData,
					legend: {
						data: item.legendDataList
					},
					xAxis: {name: unit},
					yAxis: {
						data: item.yAxisData,
					},
					tooltip: {
						formatter: function (params) {
							let strArr = [params[0].name];
							params.forEach((items) => {
								strArr.push('<span class="chart-dot" style="background-color: ' + items.color + '"></span>' + items.seriesName + ' : ' + formatAmount(items.value) + item.seriesData[0].unit || '');
							});
							return strArr.join('<br>');
						}
					}
				})
			}
		}
	}
</script>
