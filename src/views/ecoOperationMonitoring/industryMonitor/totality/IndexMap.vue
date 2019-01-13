<style lang="less">
    .map-tooltip-content {
        width: 230px;
    }

    .chart-value-red {
        color: red;
        position: absolute;
        font-weight: bold;
        right: 5px;
    }

    .chart-value-green {
        color: #5cd411;
        position: absolute;
        font-weight: bold;
        right: 5px;
    }

</style>
<template>
    <div class="h-hundred-percent">
        <map-search-bar :is-sub="isSub" @loadData="loadData" @linkToChart="linkToChart"></map-search-bar>
        <div class="content-wrap" style="height: calc(100% - 41px);">
            <div class="hot-map-page-left">
                <div class="h-hundred-percent" v-if="isLoad" v-show="!show">
                    <iframe class="i-frame" :src="arcGISUrl" ref="arcGis"></iframe>
                </div>
                <div v-show="show" class="h-hundred-percent">
                    <map-chart ref="map" @click="mapChartClick"/>
                </div>
            </div>
            <div class="hot-map-page-right">
                <div class="hot-map-page-right-top">
                    <zone-chart ref="zoneChart" @click="zoneChartClick" @legendselectchanged="zoneLegendSelectChanged"/>
                </div>
                <div class="hot-map-page-right-bottom">
                    <div class="chart optiscroll" v-loading="showLoading" ref="rankContainer">
                        <div class="search text-center">
                            <ul>
                                <li class="pull-left">
                                    <span class="zone-name">{{ currViewZoneName || zoneName }}：</span>
                                </li>
                                <li class="pull-left" v-for="item in industryTypes" style="margin-left:10px;">
                                    <label class="checkbox" style="margin: 0 0 5px 0">
                                        <input type="checkbox" v-model="item.selected"
                                               @change="onSelectIndustryType">{{ item.name}}
                                    </label>
                                </li>
                                <li class="pull-left" style="margin-left: 10px">
                                    <a href="javascript:void(0);" class="btn btn-primary" style="padding: 0 5px"
                                       @click.stop="inverse">反选</a>
                                </li>
                            </ul>
                        </div>
                        <enterprise-list :data="data" :gdp-unit="gdpUnit" :tax-unit="taxUnit"
                                         @mapPositioning="mapPositioning"></enterprise-list>
                        <div class="text-center">
                            <pagination ref="ranking" :url="url" :param="listParam"
                                        @setDataByPage="setDataByPage" @loadStateChange="loadStateChange"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import Vue from 'vue';
	import loading from '@/directives/Loading.vue';
	import {formatAmount} from '@/filters';
	import zoneChart from './IndexZoneChart.vue';
	import service from '@/services/specialmonitorService';
	import mapChart from '@/components/map/FullMapChart.vue';
	import pagination from '@/components/Pagination.vue';
	import ScrollBar from '@/assets/jsPlugins/optiscroll.min';
	import mapSearchBar from '@/components/industryMonitor/MapSearchBar.vue';
	import enterpriseList from '@/components/enterpriseInfo/EnterpriseGDPAndTaxTable.vue';
	import {iFrameReady, sendMessage, addHandler, removeHandler} from '@/common/eventUtil';

	export default {
		data() {
			return {
				isSub: false,
				show: true,
				isLoad: false,
				param: {},
				listParam: {},
				data: null,
				seriesName: '产值',
				gdpUnit: '元',
				taxUnit: '元',
				showLoading: false,
				industryTypes: [
					{name: '工业', value: 0, selected: true},
					{name: '商业', value: 1, selected: true},
					{name: '服务业', value: 2, selected: true},
					{name: '建筑业', value: 3, selected: true},
					{name: '房地产', value: 4, selected: true}
				],
				currViewZoneId: null,
				currViewZoneName: null,
				url: '/api/IndustryMonitor/IndustryIndexRanking',
				arcGISUrl: '../../../../ArcGis/html/locationMapByPostMessage.html'
			}
		},
		computed: {
			zoneName() {
				return window.localStorage.getItem('zoneName') ? window.localStorage.getItem('zoneName') : this.$store.state.zoneName;
			}
		},
		directives: {
			loading
		},
		components: {
			mapChart,
			zoneChart,
			pagination,
			mapSearchBar,
			enterpriseList
		},
		methods: {
			onSelectIndustryType() {
				let selected = {};

				this._setParam(this.param);
				this.$Progress.start();
				this.industryTypes.forEach(function (item) {
					selected[item.name] = item.selected;
				});
				this.$refs.zoneChart.setLegendSelected(selected);
				this._setMapData();
			},
			inverse() {
				this.industryTypes.forEach(function (item) {
					item.selected = !item.selected;
				});

				Vue.nextTick(() => {
					this.onSelectIndustryType();
				})
			},
			zoneChartClick(param) {
			    if(this.zoneName==param.data.name||this.zoneName=="全区"){
                    this.currViewZoneId = param.data.id;
                    this.currViewZoneName = param.data.name;
                    this._setRankingData();
                    this._showZoneData(param.data.id, param.data.name);
                }else{
			        alert("您暂无权限查看其他街镇数据。");
                }
			},
			mapChartClick(param) {
                if(this.zoneName==param.data.name||this.zoneName=="全区"){
                    this.currViewZoneId = param.data.id;
                    this.currViewZoneName = param.data.name;
                    this._setRankingData();
                    this._showZoneData(param.data.id, param.data.name);
                }else{
                    alert("您暂无权限查看其他街镇数据。");
                }
			},
			zoneLegendSelectChanged(param) {
				this.industryTypes.forEach(function (item) {
					item.selected = param.selected[item.name];
				});
				this._setParam(this.param);
				this.$Progress.start();
				this._setMapData();
			},
			setMapChartData(seriesData) {
				this._setMapChartData(seriesData);
			},
			mapPositioning(item) {
				let param = {
					zoneId: this._getCurrentViewZoneId(),
					zoneName: item.streetName,
					enterpriseName: item.enterpriseName,
					enterpriseId: item.enterpriseId,
					organizationCode: item.organizationCode,
					pageName: this.pageName,
					year: this.param.year,
					marketSubjectNum: item.marketSubjectNum,
					xyPoint: item.xy
				};
				this._postMessageForIFrame('initPositioning', 'openPositioning', param);
			},
			linkToChart() {
				this.$router.push('/industryIndex')
			},
			loadData(param) {
				this._setParam({year: param.year, queryType: param.queryType});
				this._setListParam();
				this._setMapData();
			},
			setDataByPage(item) {
				this.data = item.ResultList;
				this.gdpUnit = item.gdpUnit;
				this.taxUnit = item.taxUnit;
			},
			loadStateChange(state) {
				this.showLoading = state;
			},
			_setMapChartData(seriesData, unit) {
				this.$refs.map.setMapChartData(seriesData, unit);
			},
			_setZoneChartData(item, isFirst) {
				this.$refs.zoneChart.setChartOption(item.yAxisData, item.seriesData, isFirst);
			},
			_setMapData() {
			    var _this=this;
				this.$Progress.start();
				service.getIndustryIndexMapData({params: this.param}).then(response => {
					let item = response.data.Data;
					if (item.zoneData && item.zoneData.length > 0) {
						this._setRankingData();
						this._setMapChartData(item.zoneData.reverse(), item.zoneData[0].unit);
						this._setZoneChartData(item.ChartData, true);
						this.seriesName = this.$store.state.search.queryText;
                        setTimeout(function(){_this._setMapChartOptions();},1000);
					} else {
						this.data = null;
						this.$refs.ranking.clear();
						showWarningMsg('该条件暂时没数据!');
					}
					this.$Progress.finish();
				}, response => {
					console.log(response);
					this.$Progress.fail();
				})
			},
			_setParam(param) {
				let industryTypes = [];
				this.industryTypes.forEach((item) => {
					item.selected && industryTypes.push(item.value)
				});
				this.param = Object.assign({}, param, {industryTypes: industryTypes.toString()});
			},
			_setListParam() {
				this.listParam = Object.assign({}, this.param, {zoneId: this._getCurrentViewZoneId()});
			},
			_setRankingData() {
				this._setListParam();
				Vue.nextTick(this.$refs.ranking.initPage);
			},
			_showZoneData(zoneId, zoneName) {
				this._postMessageForIFrame('init', 'open', {
					zoneId: zoneId,
					zoneName: zoneName,
					pageName: '行业总体监测',
					year: this.param.year
				});
			},
			_postMessageForIFrame(initType, triggerType, param) {
				this.show = false;
				if (this.isLoad) {
					sendMessage(this.$refs.arcGis, {type: triggerType, param: param});
				} else {
					this.isLoad = true;
					Vue.nextTick(() => {
						iFrameReady(this.$refs.arcGis, {type: initType, param: param})
					})
				}
			},
			_backToMapChart() {
				this.show = true;
				this.currViewZoneId = null;
				this.currViewZoneName = null;
				this._setRankingData();
			},
			_receiveMessage(event) {
				let item = event.data;
				switch (item.type) {
					case 'backToChart':
						this._backToMapChart();
						break;
				}
			},
			_getCurrentViewZoneId() {
				return this.currViewZoneId || this.$store.state.zoneId;
			},
			_setMapChartOptions() {
				var _this = this;
				this.$refs.map.mergeOptions({
					tooltip: {
						trigger: 'item'
					},
					formatter: function (params) {
						let colors = {
								'工业': '#EB51A7',
								'商业': '#3398DB',
								'服务业': '#FF5554',
								'建筑业': '#FD9811',
								'房地产': '#AD6BE5',
							},
							strArr = ['<div class="map-tooltip-content">' + params.name];
						strArr.push('<span class="chart-dot" style="background-color: #2DDDDF"></span>总' + _this.seriesName + '：' + formatAmount(params.data.value) + params.data.unit);
						strArr.push('<span class="chart-dot" style="background-color: #B3C510"></span>排名：' + params.data.ranking + '</span>');
						params.data.selectedItem.forEach(function (item) {
							if (item.yoy > 0) {
								strArr.push('<span class="chart-dot" style="background-color:' + colors[item.name] + '">' +
									'</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span class="chart-value-red">↑&nbsp;' + item.yoy + '%</span>');
							} else if (item.yoy < 0) {
								strArr.push('<span class="chart-dot" style="background-color: ' + colors[item.name] + '">' +

									'</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span class="chart-value-green">↓&nbsp;' + item.yoy + '%</span>');
							} else if (item.yoy == 0) {
								strArr.push('<span class="chart-dot" style="background-color: ' + colors[item.name] + '">' +
									'</span>' + item.name + '：' + formatAmount(item.value) + params.data.unit + '<span style="float:right">&nbsp;--&nbsp;' + '</span>');
							}
						});

						return strArr.join('</br>') + '</div>'
					}
				});
			}
		},
		created() {
			addHandler(window, 'message', this._receiveMessage);
		},
		mounted() {
			new ScrollBar(this.$refs.rankContainer, {scrollStopDelay: 50});
		},
		beforeDestroy() {
			removeHandler(window, 'message', this._receiveMessage);
		}
	}
</script>