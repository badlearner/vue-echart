<template>
    <chart :options="chartOption" ref="enterprisemomgdp" auto-resize></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';

	export default {
		data() {
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
						data: null,
            selected:{
              '限下同比':false,
              '当年累计四上同比':true
            },
            textStyle: {
              fontSize: 12,
              fontWeight: 700,
              color: allColors.textColor
            }
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
						text: '当年累计四上产值同比',
						x: 'center',
						y: 'bottom',
						textStyle: {
							fontSize: 15,
							fontWeight: 700,
							color: allColors.textColor
						}
					},
					color: ['#00B026', '#9067E0', '#F02C2C'],
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
							name: '限下同比',
							type: 'line',
							data: []
						}, {
							name: '当年累计四上同比',
							type: 'line',
							data: []
						}
					]
				}
			}
		},
		methods: {
			onselectLegend(item) {
				this.$refs.enterprisemomgdp.mergeOptions({
					title: {text: item.title + '产值同比'},
					 legend: {
						selected: {
							'限下同比': item.isSelectedLimit,
							'当年累计四上同比': item.isSelectedTotalRange
						}
					}
				});
			},
			setChartOption(xAxisData, limitGdpData, rGdpAccumulaData, rGdpData) {
				xAxisData && this.$refs.enterprisemomgdp.mergeOptions({
					xAxis: {
						data: xAxisData
					},
					series: [{
						name: '限下同比',
						data: limitGdpData
					}, {
						name: '当年累计四上同比',
						data: rGdpData
					}]
				})
			}
		}
	}
</script>
