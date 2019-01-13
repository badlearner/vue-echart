<template>
    <chart :options="chartOption" ref="taxmom" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';

	export default{
		data(){
			return {
				chartOption: {
					grid: {
						top: 40,
						left: '10',
						right: '40',
						bottom: '35',
						containLabel: true
					},
					legend: {
						data: [
							{name: '全库同比', textStyle: {color: '#00B026'}},
							{name: '区库同比', textStyle: {color: '#01A0FB'}}
						]
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						formatter: function (params) {
							var strArr = [params[0].name];
							params.forEach((item) => {
								strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + (item.data || 0) + '%');
							});
							return strArr.join('<br>');
						}
					},
					title: {
						text: '全区税收同比',
						x: 'center',
						y: 'bottom',
						textStyle: {
							fontSize: 15,
							fontWeight: '700',
							color: allColors.textColor
						}
					},
					color: ['#00B026', '#01A0FB'],
					xAxis: {
						name: '日期',
						nameTextStyle: {
							color: allColors.textColor
						},
						data: [],
						axisLine: {
							show: true,
							lineStyle: {
								width: 2,
								color: allColors.textColor
							},
							onZero: false
						},
						axisLabel: {
							textStyle: {
								color: allColors.textColor
							}
						}
					},
					yAxis: {
						name: '%',
						nameTextStyle: {
							color: allColors.textColor
						},
						type: 'value',
						axisLine: {
							show: true,
							lineStyle: {
								width: 2,
								color: allColors.textColor
							}
						},
						axisLabel: {
							textStyle: {
								color: allColors.textColor
							}
						},
						splitLine: {
							lineStyle: {
								color: allColors.textColor,
								width: 0.5,
								opacity: 0.3,
								type: "dashed"
							}
						}
					},
					series: [
						{
							name: '全库同比',
							type: 'line',
							data: []
						},
						{
							name: '区库同比',
							type: 'line',
							data: []
						}
					]
				}
			}
		},
		methods: {
			setChartOption(xAxisData, fTaxData, dTaxData){
				this.$refs.taxmom.mergeOptions({
					xAxis: {
						data: xAxisData
					},
					series: [{
						name: '全库同比',
						data: fTaxData
					}, {
						name: '区库同比',
						data: dTaxData
					}]
				})
			}
		}
	}
</script>
