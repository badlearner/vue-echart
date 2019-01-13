<template>
  <div>dd</div>
<!--    <dialog-box :show="true" title="专业市场画像" :width="1050" :height="550" :is-loading="showLoading"
                @closeDialog="closeDialog">
        <slot>
            <div class="portrait-category-wrap">
                <p class="portrait-category-title">市场基本信息</p>
                <table>
                    <tr>
                        <td style="width: 100px;" class="text-right">市场名称：</td>
                        <td>{{baseInfo.Zyscmc}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">组织机构代码：</td>
                        <td>{{baseInfo.Zzjgdm}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">联系人：</td>
                        <td>{{baseInfo.SJFZRXM}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">联系电话：</td>
                        <td>{{baseInfo.SJFZRLXDH}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">街镇：</td>
                        <td>{{baseInfo.Streettownname}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">经营地址：</td>
                        <td>{{baseInfo.JYDZ}}</td>
                    </tr>
                    <tr>
                        <td class="text-right">经营范围：</td>
                        <td>{{baseInfo.ZYJYFW}}</td>
                    </tr>
                </table>

                <hr class="portrait-category-split-line">
                <p class="portrait-category-title border-top">经济指表</p>
                <table class="table td-center">
                    <thead class="th-center">
                    <tr>
                        <th>年份</th>
                        <th>市场交易总额(万元)</th>
                        <th>运营机构营业总额(万元)</th>
                        <th>运营机构税收总额(万元)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in KPI">
                        <td>{{item.Nf}}</td>
                        <td>{{item.NSCJYZE}}</td>
                        <td>{{item.NSCYYJGYYZE}}</td>
                        <td>{{item.NSCYYJGSSE}}</td>
                    </tr>
                    <tr>
                        <td>2014</td>
                        <td>370058</td>
                        <td>3254</td>
                        <td>334</td>
                    </tr>
                    <tr>
                        <td>2013</td>
                        <td>360058</td>
                        <td>3154</td>
                        <td>330</td>
                    </tr>
                    <tr>
                        <td>2012</td>
                        <td>350058</td>
                        <td>3054</td>
                        <td>320</td>
                    </tr>
                    </tbody>
                </table>

                <hr class="portrait-category-split-line">
                <p class="portrait-category-title">
                    <span class="dis-inlie" v-bind:class="{ 'dis-active': isA }" @click="tab1">特征信息</span>
                    <span class="dis-inlie" v-bind:class="{ 'dis-active': isB }" @click="tab2">土地信息</span>
                    <span class="dis-inlie" v-bind:class="{ 'dis-active': isC }" @click="tab3">建筑信息</span>
                </p>
                <div v-show="tTab1">
                    <table class="table td-center">
                        <thead class="th-center">
                        <tr>
                            <th>档口数量</th>
                            <th>注册地址与经营地址一致的</th>
                            <th>企业数量</th>
                            <th>个体户</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in featureInfo">
                            <td>{{item.ZDKSL}}</td>
                            <td>{{item.ZCDYJJDYZDDKSL}}</td>
                            <td>{{item.FRQYSL}}</td>
                            <td>{{item.FFRQYSL}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="tTab2">
                    <table class="table td-center">
                        <thead class="th-center">
                        <tr>
                            <th>总占地面积（m²）</th>
                            <th>国有土地权属面积</th>
                            <th>集体土地权属面积</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{area.ZZDMJ}}</td>
                            <td>{{area.GYTDQSMJ}}</td>
                            <td>{{area.JTTDQSMJ}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div v-show="tTab3">
                    <table class="table td-center">
                        <thead class="th-center">
                        <tr>
                            <th>总建筑面积（m²）</th>
                            <th>容积率</th>
                            <th>建筑密度</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{{area.ZJZMZ}}</td>
                            <td>{{area.RJL}}</td>
                            <td>{{area.JZMD}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="portrait-category-wrap">
                <div class="category-wrap" style="height:284px">
                    <p class="portrait-category-title ">穿透分析</p>
                    <ul class="ul-info-list">
                        <li>
                            <span class="e-col-title">宗地面积：</span>
                            <span class="e-col-name">27462.1 平方米</span>
                        </li>
                    </ul>
                    <p class="text-center ">片区房价(元)</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>片区</th>
                            <th>2012</th>
                            <th>2013</th>
                            <th>2014</th>
                            <th>2015</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>江高片</td>
                            <td>4464</td>
                            <td>4960</td>
                            <td>5078</td>
                            <td>5078</td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="text-center">土地利用现状数据2014平方米</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>现状建设用地面积</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>27,462.09</td>
                        </tr>
                        </tbody>
                    </table>
                    <p class="text-center ">基准地价(元)</p>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>用途</th>
                            <th>2012</th>
                            <th>2013</th>
                            <th>2014</th>
                            <th>2016</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>商业</td>
                            <td>-</td>
                            <td>3262</td>
                            <td>3646</td>
                            <td>4506</td>
                        </tr>
                        <tr>
                            <td>工业</td>
                            <td>-</td>
                            <td>706</td>
                            <td>730</td>
                            <td>749</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <hr class="portrait-category-split-line">
                <split-screen-comparison :enlarge.sync="enlarge" :image-height="176"
                                         :image-width="338"></split-screen-comparison>
            </div>
            <div class="portrait-category-wrap">
                <promotional-video :url="videoUrl" :width="338"></promotional-video>

                <hr class="portrait-category-split-line">
                <p class="portrait-category-title border-top">人员结构</p>
                <div style="height:30%;">
                    <person-chart ref=person></person-chart>
                </div>

                <hr class="portrait-category-split-line">
                <table class="table">
                    <thead class="th-center">
                    <tr>
                        <th>企业列表</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in listData">
                        <td>
                            <a class="operation" @click.stop="subCompany(item)">
                                {{item.QYMC}}
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </slot>
    </dialog-box>-->
</template>
<!--
<script>
	import personChart from './PersonChart.vue';
	import dialogBox from '@/components/Dialog.vue';
	import service from '@/services/specialmonitorService';
	import promotionalVideo from '@/components/portrait/PromotionalVideo.vue';
	import splitScreenComparison from '@/components/portrait/SplitScreenComparison.vue';

	export default {
		data() {
			return {
				videoUrl: '/src/assets/video/baiyun.mp4',
				hideUrl: '../../../../../ArcGis/html/spatialAnalysisWebServer.html',
				show: false,
				isA: true,
				isB: false,
				isC: false,
				tTab1: true,
				tTab2: false,
				tTab3: false,
				enlarge: false,
				showLoading: false,
				listData: [{
					"ID": "dc1e2946-a317-4538-b01c-a69e0156e404",
					"QYMC": "中国南方航空股份有限公司",
					"ZZJGDM": "100017600",
					"CZ": 0,
					"StreetTownName": "人和镇",
					"rn": 0,
					"OutputValue": 684.5858,
					"OutputValueSort": 1,
					"Tax": 0,
					"TaxSort": 0,
					"QYID": "00000000-0000-0000-0000-000000000000",
					"BSSJ": null,
					"Year": 2013
				}, {
					"ID": "d5c8b6b8-9deb-4804-be48-a69e0147356b",
					"QYMC": "华南蓝天油料有限公司",
					"ZZJGDM": "617425586",
					"CZ": 0,
					"StreetTownName": "三元里街",
					"rn": 0,
					"OutputValue": 247.6204,
					"OutputValueSort": 2,
					"Tax": 0,
					"TaxSort": 0,
					"QYID": "00000000-0000-0000-0000-000000000000",
					"BSSJ": null,
					"Year": 2013
				}, {
					"ID": "46d03c19-b21c-4be2-a2f5-a69e015a8b28",
					"QYMC": "广物汽贸股份有限公司",
					"ZZJGDM": "617405999",
					"CZ": 0,
					"StreetTownName": "云城街",
					"rn": 0,
					"OutputValue": 239.1314,
					"OutputValueSort": 3,
					"Tax": 0,
					"TaxSort": 0,
					"QYID": "00000000-0000-0000-0000-000000000000",
					"BSSJ": null,
					"Year": 2013
				}, {
					"ID": "3158dbf8-06a9-4ecc-8653-a69e01585283",
					"QYMC": "白云电气集团有限公司",
					"ZZJGDM": "231251149",
					"CZ": 0,
					"StreetTownName": "江高镇",
					"rn": 0,
					"OutputValue": 104.6712,
					"OutputValueSort": 4,
					"Tax": 0,
					"TaxSort": 0,
					"QYID": "00000000-0000-0000-0000-000000000000",
					"BSSJ": null,
					"Year": 2013
				}, {
					"ID": "7622752d-1627-4550-ba5f-a69e0109c6d4",
					"QYMC": "广州联华实业发展有限公司",
					"ZZJGDM": "737169396",
					"CZ": 0,
					"StreetTownName": "京溪街",
					"rn": 0,
					"OutputValue": 91.6005,
					"OutputValueSort": 5,
					"Tax": 0,
					"TaxSort": 0,
					"QYID": "00000000-0000-0000-0000-000000000000",
					"BSSJ": null,
					"Year": 2013
				}],
				baseInfo: '',
				KPI: '',
				area: '',
				personAges: new Array(),
				personEducation: new Array(),
				featureInfo: '',
			}
		},
		components: {
			dialogBox,
			personChart,
			promotionalVideo,
			splitScreenComparison
		},
		methods: {
			subCompany(item) {
				this.$root.eventHub.$emit('showDialogWithEnterpriseDetail', item.ID, item.ZZJGDM, item.QYMC);
			},
			closeDialog() {
				this.$emit('hidePortrait')
			},
			tab1() {
				this.tTab1 = true;
				this.tTab2 = false;
				this.tTab3 = false;
				this.isA = true;
				this.isB = false;
				this.isC = false;
			},
			tab2() {
				this.tTab2 = true;
				this.tTab3 = false;
				this.tTab1 = false;
				this.isA = false;
				this.isB = true;
				this.isC = false;
			},
			tab3() {
				this.tTab1 = false;
				this.tTab2 = false;
				this.tTab3 = true;
				this.isA = false;
				this.isB = false;
				this.isC = true;
			},
			setPortraitDataById(id) {
				this.showLoading = true;
				service.getProMarketData({params: {id: id}}).then((response) => {
					this.baseInfo = response.data.Data.baseInfo;
					this.KPI = response.data.Data.KPI;
					this.featureInfo = response.data.Data.featureInfo;
					this.area = {
						ZZDMJ: this.baseInfo.ZZDMJ,
						GYTDQSMJ: this.baseInfo.GYTDQSMJ,
						JTTDQSMJ: this.baseInfo.JTTDQSMJ,
						ZJZMZ: this.baseInfo.ZJZMZ,
						RJL: this.baseInfo.RJL,
						JZMD: this.baseInfo.JZMD,
					};
					this.personEducation[0] = {value: this.baseInfo.BK, name: '本科及以上'};
					this.personEducation[1] = {value: this.baseInfo.DZ, name: '大专'};
					this.personEducation[2] = {value: this.baseInfo.GZZJ, name: '高中、中技'};
					this.personEducation[3] = {value: this.baseInfo.CZ, name: '初中'};
					this.personEducation[4] = {value: this.baseInfo.XXJYX, name: '小学及以下'};
					this.personAges[0] = {value: this.baseInfo.SBSYX, name: '18岁以下'};
					this.personAges[1] = {value: this.baseInfo.SBZES, name: '18-25'};
					this.personAges[2] = {value: this.baseInfo.ELZSS, name: '26-30'};
					this.personAges[3] = {value: this.baseInfo.SSZSS, name: '30-40'};
					this.personAges[4] = {value: this.baseInfo.SSYS, name: '40以上'};
					this.$refs.person.setOption(this.personEducation, this.personAges);
					this.showLoading = false;
				}, (response) => {
					this.showLoading = false;
					console.log(response);
				})
			}
		}
	}
</script>-->
