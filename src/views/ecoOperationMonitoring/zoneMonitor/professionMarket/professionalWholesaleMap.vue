<template>
    <div class="h-hundred-percent">
        <div class="hot-map-page-left dropdown">
            <div class="h-hundred-percent" v-if="isLoad" v-show="!show">
                <iframe class="i-frame" src="../../../../ArcGis/html/locationMap.html" id="gisLocationMap"></iframe>
            </div>
            <div v-show="show" class="h-hundred-percent">
                <map-chart ref="map" @click="mapChartClick"></map-chart>
            </div>
        </div>
        <div class="hot-map-page-right">
            <div class="hot-map-page-right-top">
                <zone-chart ref="zone" @click="zoneChartClick" @goToChart="goToChart"/>
            </div>
            <div class="hot-map-page-right-bottom">
                <div class="chart optiscroll" v-loading="showLoading" ref="container">
                    <search placeholder="市场搜索" @search="search"/>
                    <table class="list-table td-center th-center col-padding-4">
                        <thead>
                        <tr>
                            <th>排名</th>
                            <th>市场名称</th>
                            <th>交易总额({{gdpUnit}})</th>
                            <th>税收总额({{taxUnit}})</th>
                            <th style="width: 80px">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in data">
                            <td>{{item.sort}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.gdp}}</td>
                            <td>{{item.tax}}</td>
                            <td><a class="operation" @click.stop="mapPositioning(item)">定位</a></td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="text-center">
                        <pagination ref="ranking" :url="url" :param="param" @setDataByPage="setDataByPage" @loadStateChange="loadStateChange"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import Vue from 'vue';
	import {iFrame, info} from '@/common/iframe';
	import loading from '@/directives/Loading.vue';
	import search from '@/components/map/SearchBar.vue';
	import pagination from '@/components/Pagination.vue';
	import service from '@/services/specialmonitorService';
	import mapChart from '@/components/map/FullMapChart.vue';
	import ScrollBar from '@/assets/jsPlugins/optiscroll.min';
	import zoneChart from '@/components/map/SingleZoneDataChart.vue';

	export default {
		data() {
			return {
				isLoad: false,
				show: true,
				data: null,
				gdpUnit: null,
				taxUnit: null,
				showLoading: false,
				currViewZoneId: null,
				param: {
					marketName: null,
					fourTopStatus: null,
					zoneId: null
				},
				url: '/api/IndustryMonitor/StreetSpecializedMarketDetail'
			}
		},
		directives: {
			loading
		},
		components: {
			zoneChart,
			pagination,
			mapChart,
			search
		},
		methods: {
			setDataByPage(data, other) {
				this.gdpUnit = data.gdpunit;
				this.taxUnit = data.taxunit;
				this.data = data.data;
			},
			search(condition) {
				this.param.marketName = condition.name;
				this.param.fourTopStatus = condition.fourTopStatus;
				this._setProfessionalWholesaleList();
			},
			zoneChartClick(param) {
                var zoneName=window.localStorage.getItem('zoneName') ? window.localStorage.getItem('zoneName') : this.$store.state.zoneName;
                if(param.data.name==zoneName||zoneName=="全区"){
                    this._showZoneData(param.data.streetId, param.data.name);
                }else{
                    alert("您暂无权限查看其他街镇数据。");
                }
			},
			mapChartClick(param) {
                var zoneName=window.localStorage.getItem('zoneName') ? window.localStorage.getItem('zoneName') : this.$store.state.zoneName;
                if(param.data.name==zoneName||zoneName=="全区"){
				    this._showZoneData(param.data.streetId, param.data.name);
                }else{
                    alert("您暂无权限查看其他街镇数据。");
                }
			},
			mapPositioning(item) {
				this.show = false;
				info.XZQID = null;
				info.XZQMC = null;
				info.enterpriseName = item.name;
				info.enterpriseId = item.id;
				info.pageName = '专业批发市场';
				this._showArcGis(info, 'mapPosition');
			},
			goToChart() {
				this.$router.push('/professionalWholesale');
			},
			loadStateChange(state) {
				this.showLoading = state;
			},
			echartLocateToMap(info, type) {
				let self = this;
				return function () {
					setTimeout(function () {
						self.$Progress.finish();
					}, 500);
					return {
						info: info,
						click: type
					}
				}
			},
			_showArcGis(info, click) {
				if (this.isLoad) {
					iFrame.iFrameFunction({info: info, click: click});
				} else {
					window.echartLocateToMap = this.echartLocateToMap(info, click);
					this.isLoad = true;
					this.$Progress.start();
				}
			},
			_showZoneData(zoneId, zonenName) {
				this.show = false;
				this.currViewZoneId = zoneId;
				info.XZQID = zoneId;
				info.XZQMC = zonenName;
				info.pageName = '专业批发市场';

				this._setProfessionalWholesaleList();
				this._showArcGis(info, 'streetChart');
			},
			_setProfessionalWholesaleData() {
				service.getProData().then((response) => {
					let data = response.data.Data;
					this._setStreetChartData(data.yAxisData, data.seriesData);
					this._setMapChartData(data.seriesData);
					this._setProfessionalWholesaleList();
					this.$Progress.finish();
				}, (response) => {
					console.log(response);
					this.$Progress.fail();
				});
			},
			_setProfessionalWholesaleList() {
				this.param.zoneId = this._getCurrentViewZoneId();
				Vue.nextTick(() => {
					this.$refs.ranking.initPage();
				})
			},
			_setMapChartData(seriesData) {
				this.$refs.map.setMapChartData(seriesData, '个');
			},
			_setStreetChartData(yAxisData, seriesData) {
				this.$refs.zone.setChartOption(yAxisData, '个', seriesData, '专业批发市场数量');
			},
			_backToChartMap() {
				this.show = true;
			},
			_getCurrentViewZoneId() {
				return this.currViewZoneId || this.$store.state.zoneId;
			}
		},
		mounted() {
			window.backToChartMap = this._backToChartMap;
			new Optiscroll(this.$refs.container, {scrollStopDelay: 50});
			this._setProfessionalWholesaleData();
		},
		beforeDestroy() {
			window.backToChartMap = null;
		}
	}
</script>