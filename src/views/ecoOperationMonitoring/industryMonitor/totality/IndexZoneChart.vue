<template>
    <chart :options="chartOption" name="zone" ref="zone" @click="chartClick" auto-resize
           @legendselectchanged="legendselectchanged"/>
</template>
<script type="text/ecmascript-6">
	import {add} from '@/common/account';
  import allColors from '@/utils/styleUtil';
  import {formatAmount} from '@/filters';

	export default {
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
						data: ['工业', '商业', '服务业', '建筑业', '房地产']
					},
					color: ['#EB51A7', '#3398DB', '#FF5554', '#FD9811', '#AD6BE5'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '10',
						right: '65',
						bottom: '20',
						top: '30',
						containLabel: true
					},
					dataZoom: [
						{
							type: 'slider',
							show: true,
							yAxisIndex: [0],
							width: 20,
							top: 65,
							start: 65,
							end: 100,
							showDetail: false
						}
					],
					xAxis: {
						name: '平方米',
						nameTextStyle: {
							color: allColors.textColor
						},
						position: 'top',
						type: 'value',
						splitLine: {show: false},
						axisLabel: {
							show: true,
							textStyle: {
								color: allColors.textColor
							},
							formatter: function (value, index) {
								if (value.toString().indexOf(".") != -1) {
									return formatAmount(value);
								} else {
									return value;
								}
							}
						},
						axisLine: {
							lineStyle: {
								color: allColors.textColor,
								width: 2
							}
						}
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
					series: [
						{
							name: '工业',
							type: 'bar',
							stack: '面积',
							barWidth: '80%',
							data: []
						},
						{
							name: '商业',
							type: 'bar',
							stack: '面积',
							barWidth: '80%',
							data: []
						}, {
							name: '服务业',
							type: 'bar',
							stack: '面积',
							barWidth: '80%',
							data: []
						},
						{
							name: '建筑业',
							type: 'bar',
							stack: '面积',
							barWidth: '80%',
							data: []
						}, {
							name: '房地产',
							type: 'bar',
							stack: '面积',
							barWidth: '80%',
							data: []
						}
					]
				}
			}
		},
		computed: {
			seriesName() {
				return this.$store.state.search.queryText;
			}
		},
		methods: {
			chartClick: function (params) {
				this.$emit('click', params)
			},
			goToChart() {
				this.$emit('goToChart');
			},
			legendselectchanged(params) {
				this.$emit('legendselectchanged', params);
			},
			setLegendSelected(selected) {
				this.$refs.zone.mergeOptions({
					legend: {selected: selected}
				})
			},
			setChartOption(yAxisData, seriesData, isFirst) {
				let unit = (seriesData && seriesData[0].unit) || '';

				this.$refs.zone.mergeOptions({
					title: {text: "街镇" + this.seriesName + "排名"},
					tooltip: {
						formatter: function (params) {
							var strArr = [params[0].name];
							params.forEach((item) => {
								strArr.push('<span class="chart-dot" style="background-color: ' + item.color + '"></span>' + item.seriesName + ' : ' + formatAmount(item.value) + unit);
							});
							return strArr.join('<br>');
						}
					},
					xAxis: {name: unit},
					yAxis: {data: yAxisData || []},
					series: seriesData || []
				})
			}
		}
	}
</script>
