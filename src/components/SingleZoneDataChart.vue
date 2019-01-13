<template>
    <div style="height:100%;">
        <chart :options="chartOption" name="zone" ref="zone" auto-resize @click="chartClick"></chart>
    </div>
</template>
<script>
	import {formatInt} from '@/filters';
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
					legend: {
						left: 'center',
						itemWidth: 15,
						textStyle: {
							color: allColors.textColor
						},
						data: []
					},
					color: ['#3398DB'],
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
						bottom: '5',
						containLabel: true
					},
					dataZoom: [
						{
							type: 'slider',
							show: true,
							yAxisIndex: [0],
							width: 20,
							start: 60,
							end: 100,
							showDetail: false
						}
					],
					xAxis: {
						nameTextStyle: {
							color: allColors.textColor
						},
						type: 'value',
						splitLine: {
							show: false
						},
						axisLabel: {
							show: false,
							textStyle: {
								color: allColors.textColor
							}
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: allColors.textColor,
								width: 2
							}
						}
					},
					yAxis: {
						type: 'category',
						splitLine: {show: true},
						min: 'dataMin',
						max: 'dataMax',
						data: ['-'],
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: allColors.textColor,
								width: 2
							}
						},
						splitLine: {
							show: false
						}
					},
					series: [
						{
							name: '镇街信息',
							type: 'bar',
							barMaxWidth: 35,
							data: [0]
						}
					]
				}
			}
		},
		methods: {
			resize: function () {
				this.$refs.zone.resize();
			},
			goToChart() {
				this.$emit('goToChart');
			},
			chartClick(params) {
				this.$emit('click', params);
			},
			setChartOption: function (yAxisData, unit, seriesData, seriesName) {
				this.$refs.zone.mergeOptions({
					legend: {data: [seriesName]},
					xAxis: {name: unit},
					yAxis: {
						data: yAxisData,
					},
					tooltip: {
						formatter: function (params) {
							var strArr = '';
							strArr = '<span class="chart-dot" style="background-color: ' + params[0].color + '"></span>' + params[0].name + ' : ' + formatInt(params[0].value) + unit;
							return strArr;
						}
					},
					series: [
						{
							name: seriesName,
							type: 'bar',
							barMaxWidth: 35,
							data: seriesData
						}
					]
				})
			}
		}
	}
</script>
