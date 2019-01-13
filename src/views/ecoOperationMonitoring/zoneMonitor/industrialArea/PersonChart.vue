<template>
    <chart :options="person" name="person" ref="person"></chart>
</template>
<script>
  import allColors from '@/utils/styleUtil';
	import {formatInt} from '@/filters';

	export default{
		data(){
			return {
				person: {
					title: {
						text: '学历                                  年龄',
						x: 'center',
						y: 'bottom',
						textStyle: {
							fontSize: 13,
							fontWeight: 700
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					grid: {
						left: '10',
						right: '20',
						bottom: '30',
						containLabel: true
					},
					color: ['#3398DB', '#88C601', '#EB51A7', '#1BA261', '#68217A'],
					legend: {
						orient: 'vertical',
						left: 'left',
						data: []
					},
					series: [
						{
							name: '学历',
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							center: ['25%', '40%'],
							avoidLabelOverlap: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true
								}
							},
							data: [
								{value: 245, name: '本科'},
								{value: 625, name: '大专'},
								{value: 720, name: '大专以下'},
								{value: 18, name: '博士'},
								{value: 32, name: '硕士'}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						},
						{
							name: '年龄',
							type: 'pie',
							radius: ['40%', '70%'],
							avoidLabelOverlap: false,
							center: ['75%', '40%'],
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true
								}
							},
							data: [
								{value: 14, name: '60岁以上'},
								{value: 82, name: '50-60岁'},
								{value: 245, name: '40-50岁'},
								{value: 625, name: '30-40岁'},
								{value: 1220, name: '20-30岁'}
							],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
			}
		},
		methods: {
			resize: function () {
				this.$refs.person.resize();
			},
			setOption: function (personEducation, personAges) {
				this.$refs.person.mergeOptions({
					series: [{
						data: personEducation
					}, {
						data: personAges
					}]
				})
			}
		}
	}
</script>
