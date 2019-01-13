<template>
    <chart :options="chartOption" name="quantity" ref="quantityChart" @click="chartClick" auto-resize></chart>
</template>
<script type="text/ecmascript-6">
  import allColors from '@/utils/styleUtil';
  import {formatAmount,formatInt} from '@/filters';

	export default{
		data(){
			return {
				chartOption: {
					title: {
						text: '各行业企业数量图',
						top: 'bottom',
						left: 'center',
						textStyle: {
							color: allColors.textColor,
							fontSize: 15,
							fontWeight: 700
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {            // 坐标轴指示器，坐标轴触发有效
							type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						y: 10,
						x: 'center',
						itemWidth: 15,
						itemHeight: 12,
						textStyle: {color: allColors.textColor},
						data: ['工业', '商业', '服务业', '建筑业', '房地产']
					},
					grid: {
						left: '5',
						right: '40',
						top: '40',
						bottom: '30',
						containLabel: true
					},
					xAxis: [
						{
							name: '日期',
							type: 'category',
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
							},
							splitLine: {
								show: false
							},
							data: ['-']
						}
					],
					yAxis: [
						{
							name: '家',
							nameTextStyle: {
								color: allColors.textColor
							},
							type: 'value',
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
							},
							splitLine: {
								show: false
							}
						}
					],
					series: [
						{
							name: '工业',
							barMaxWidth: 20,
							type: 'bar',
							stack: '行业',
							itemStyle: {
								normal: {
									color: '#ff91c9'
								}
							},
							data: []
						},
						{
							name: '商业',
							barMaxWidth: 20,
							type: 'bar',
							stack: '行业',
							itemStyle: {
								normal: {
									color: '#a800f5'
								}
							},
							data: []
						},
						{
							name: '服务业',
							barMaxWidth: 20,
							type: 'bar',
							stack: '行业',
							itemStyle: {
								normal: {
									color: '#ff4d02'
								}
							},
							data: []
						},
						{
							name: '建筑业',
							barMaxWidth: 20,
							type: 'bar',
							stack: '行业',
							itemStyle: {
								normal: {
									color: '#feb005'
								}
							},
							data: []
						},
						{
							name: '房地产',
							barMaxWidth: 20,
							type: 'bar',
							stack: '行业',
							itemStyle: {
								normal: {
									color: '#edfb06'
								}
							},
							data: []
						}
					]
				}
			}
		},
		methods: {
			chartClick: function (params) {
				this.$emit('click', params)
			},
			setChartOption: function (data) {
				this.$refs.quantityChart.mergeOptions({
					xAxis: {
						data: data.xAxisData
					},
					legend: {data: ['工业', '商业', '服务业', '建筑业', '房地产']},
					tooltip: {
						formatter: function (params) {
							var strArr = [params[0].name];
							params.forEach((item) => {
								strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatInt(item.data) + '家');
							})
							;
							return strArr.join('<br>');
						}
					},
					series: [{
						name: '工业',
						stack: '行业',
						data: data.industry
					}, {
						name: '商业',
						stack: '行业',
						data: data.wrsf
					}, {
						name: '服务业',
						stack: '行业',
						data: data.service
					}, {
						name: '建筑业',
						stack: '行业',
						data: data.construction
					}, {
						name: '房地产',
						barMaxWidth: 20,
						type: 'bar',
						stack: '行业',
						data: data.realEstateDevelopment
					}]
				})
			}
		}
	}
</script>
