<template>
    <chart :options="street" name="street" ref=street></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

	export default{
		data(){
			return {
				street: {
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
						left: '10',
						right: '20',
						bottom: '0',
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
						name: '个',
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
						splitLine: {show: false},
						min: 'dataMin',
						max: 'dataMax',
						data: ['-'],
						axisLabel: {
							show: true,
							interval: 0,
							textStyle: {
								color: allColors.textColor,
								fontSize: 12
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
					series: [
						{
							name: '专业批发市场数量',
							type: 'bar',
							barMaxWidth: 35,
							data: []
						}
					]
				}
			}
		},
		methods: {
			resize: function () {
				this.$refs.street.resize();
			},
			setOption: function (data) {
				this.$refs.street.mergeOptions({
					legend: {data: ['专业批发市场数量']},
					xAxis: {name: ''},
					yAxis: {
						data: data.yAxisData
					},
					tooltip: {
						formatter: function (params) {
							var strArr = '';
							strArr = '<span class="chart-dot" style="background-color: ' + params[0].color + '"></span>' + params[0].name + ' : ' + params[0].data + '个';
							return strArr;
						}
					},
					series: {data: data.data}
				})
			}
		}
	}
</script>
