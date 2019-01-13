<template>
  <div class="row sets-data-table" style="height:100%;background: #fff;margin:0 3px;padding:3px;" >
    <iframe src="http://10.40.0.72:18080/smartbi/vision/openresource.jsp?resid=I8aa880a10162dbb0dbb003660162e0c9a8640952&user=admin&password=12345
" style="height:100%;width:100%;border:none"></iframe>
<!--    <div v-if="isShow">
      <div>
        查询企业：
        <el-input type="text" v-model="form.companyName" placeholder="请输入企业名称、统一社会信用代码或注册号" size="mini"
                  style="width:200px;"></el-input>
        经营范围：
        <el-input type="text" v-model="form.scope" placeholder="请输入一般经营项目或前置许可经营项目" size="mini"
                  style="width:200px;"></el-input>
        成立日期：
        <el-date-picker v-model="form.startDay" type="date" placeholder="开始日期" size="mini"></el-date-picker>
        -
        <el-date-picker v-model="form.endDay" type="date" placeholder="结束日期" size="mini"></el-date-picker>
      </div>
      <div>
        <span>企业类型：</span>
        <el-checkbox-group v-model="checkedCities" @change="companyTypeChange">
          <el-checkbox v-for="city in companyType" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <span style="padding-left: 30px;">产业类型：</span>
        <el-checkbox-group v-model="checkedCities" @change="industryTypeChange">
          <el-checkbox v-for="city in industryType" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span style="padding-right: 25px;">街镇：</span>
        <el-checkbox-group v-model="checkedCities" @change="streetNameChange">
          <el-checkbox v-for="city in streetName" :label="city.ZJ" :key="city.ZJ">{{city.ZJ}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span style="padding-right: 25px;">行业：</span>
        <el-checkbox-group v-model="checkedCities" @change="industryChange">
          <el-checkbox v-for="city in industry" :label="city.HYMC" :key="city.HYDM">{{city.HYMC}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span>注册资金：</span>
        <el-checkbox-group v-model="checkedCities" @change="fundsChange">
          <el-checkbox v-for="city in funds" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span>基本信息：</span>
        <el-checkbox-group v-model="checkedCities" @change="baseInfoChange">
          <el-checkbox v-for="city in baseInfo" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div>
        <span style="padding-right: 25px;">地域：</span>
        <el-checkbox-group v-model="checkedCities" @change="areaChange">
          <el-checkbox v-for="city in area" :label="city.value" :key="city.value">{{city.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div>
      <button class="btn btn-sm btn-success pull-right" style="margin-right: 5px;" type="button" @click="showToggle()">
        <i class="fa fa-arrow-dowm"></i>{{btnText}}
      </button>
      <button class="btn btn-sm btn-primary pull-right" style="margin-right: 5px;" type="button" @click="search()">
        <i class="fa fa-search"></i>查询
      </button>
    </div>
    <div class="height50">
      <el-table
        :data="tableData2"
        height="300"
        border
        stripe
        style="width: 100%">
        <el-table-column
          v-for="item in columnData2"
          v-bind:key="item.label"
          :prop=item.prop
          :label=item.label
          :width=item.width>
        </el-table-column>
      </el-table>
      <div class="text-center">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="100">
        </el-pagination>
      </div>
    </div>
    <div class="tab">
      <span :class="{isactive:isClick}" @click="tabChange">行业企业数量统计</span><span :class="{isactive:!isClick}"
                                                                                @click="tabChange">街镇企业数量统计</span>
      <div style="height:500px;width:100%">
        <bar-echart ref="barchart"></bar-echart>
      </div>
    </div>-->
  </div>
</template>
<script>
  import service from '@/services/spaceAnalysis/spaceAnalysis';
  import barEchart from './barEchart.vue';

  export default {
    components: {
      barEchart
    },
    data() {
      return {
        isClick: true,
        isShow: true,
        btnText: '隐藏查询条件',
        form: {
          companyName: '',
          scope: '',
          startDay: '',
          endDay: ''
        },
        checkAll: false,
        checkedCities: [],
        companyType: ['内资', '外资', '个体化'],
        industryType: [{
          value: 'IS_YYQY',
          label: '亿元企业'
        }, {
          value: 'IS_IAB',
          label: 'IAB企业'
        }, {
          value: 'IS_NEM',
          label: 'NEM企业'
        }, {
          value: 'IS_KJY',
          label: '科技企业'
        }, {
          value: 'IS_WHY',
          label: '文化企业'
        }, {
          value: 'IS_SMY',
          label: '商贸企业'
        }, {
          value: 'IS_HZY',
          label: '会展企业'
        }],
        streetName: [],
        industry: [],
        funds: [{
          value: '不限',
          label: '不限'
        }, {
          value: '0,10',
          label: '0-10万元'
        }, {
          value: '10,50',
          label: '10-50万元'
        }, {
          value: '50,100',
          label: '50-100万元'
        }, {
          value: '100,500',
          label: '100-500万元'
        }, {
          value: '500,1000',
          label: '500-1000万元'
        }, {
          value: '1000,5000',
          label: '1000-5000万元'
        }, {
          value: '5000,10000',
          label: '5000-1亿元'
        }, {
          value: '10000,100000',
          label: '1-10亿元'
        }, {
          value: '100000',
          label: '10亿以上'
        }],
        baseInfo: [{
          value: '一般经营项目',
          label: '一般经营项目'
        }, {
          value: '前置许可项目',
          label: '前置许可项目'
        }],
        area: [{
          value: '省份',
          label: '省份'
        }, {
          value: '城市',
          label: '城市'
        }, {
          value: '区域',
          label: '区域'
        }, {
          value: '街镇',
          label: '街镇'
        }],
        isIndeterminate: true,
        columnData2: [
          {prop: 'companyName', label: '企业名称', width: 350},
          {prop: 'streetName', label: '企业注册号', width: 180},
          {prop: 'TYSHXYDM', label: '统一社会信用代码', width: 180},
          {prop: 'address', label: '地址', width: 300},
          {prop: 'FDDLR', label: '法定代理人', width: 150},
          {prop: 'CRSJ', label: '成立日期', width: 150}
        ],
        tableData2: [{
          companyName: '广州未必广告有限公司',
          streetName: '官洲街',
          TYSHXYDM: '056433544G332',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州泛在文化传播有限公司',
          streetName: '赤港街',
          TYSHXYDM: '033215544G322',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州丽港房地产投资有限公司',
          streetName: '江海街',
          TYSHXYDM: '004535544G332',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州泛在文化传播有限公司',
          streetName: '瑞宝街',
          TYSHXYDM: '001235544G332',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州万力集团有限公司',
          streetName: '华洲街',
          TYSHXYDM: '新百佳小商品城',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州市新金域实业有限公司',
          streetName: '南洲街',
          TYSHXYDM: '002565544G332',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }, {
          companyName: '广州粤泰金控投资有限公司',
          streetName: '华洲街',
          TYSHXYDM: '000335544G332',
          address: 500,
          FDDLR: 200,
          CRSJ: '2010-05-12'
        }],
        seriesData: [2000, 1500, 1400, 1300, 1600, 1100, 1200, 1400, 1300, 1600, 1000, 500, 400, 300, 600, 100, 200, 400]
      };
    },
    methods: {
      showToggle(val) {
        this.isShow = !this.isShow;
        if (this.isShow) {
          this.btnText = '隐藏查询条件';
        } else {
          this.btnText = '显示查询条件';
        }
      },
      tabChange() {
        this.isClick = !this.isClick;
        if(this.isClick){
          this.$refs.barchart.setChartOption({xAxisData: this.streetName, seriesData: this.seriesData, unit: '亿元'});
        }else{
          this.$refs.barchart.setChartOption({xAxisData: this.industry, seriesData: this.seriesData, unit: '亿元'});
        }
      },
      search() {
      },
      companyTypeChange(value) {

      },
      industryTypeChange(value) {

      },
      industryChange(value) {

      },
      streetNameChange(value) {

      },
      fundsChange(value) {

      },
      baseInfoChange(value) {

      },
      areaChange(value) {

      },
      getStreetData() {
        service.getStreetData().then(result => {
          this.streetName = result;
          //this.$refs.barchart.setChartOption({xAxisData: result, seriesData: this.seriesData, unit: '亿元'});
        });
        service.getChooseInsutryData().then(result => {
          this.industry = result;
        });
        //this.$refs.barchart.setChartOption({xAxisData:this.streetName, seriesData:this.seriesData, unit:'亿元'});

      }
    },
    mounted() {
      //this.getStreetData();
    },
  };
</script>
<style>
  .sets-data-table .el-checkbox-group {
    display: inline;
  }

  .sets-data-table .el-checkbox-group .el-checkbox + .el-checkbox {
    margin-left: 15px;
  }

  .sets-data-table .height100 {
    height: 90%;
  }

  .sets-data-table .height50 {
    height: 62%;
  }

  .sets-data-table .el-table td, .sets-data-table .el-table th {
    padding: 6px 0;
  }

  .sets-data-table .el-checkbox-group .el-checkbox__label {
    padding-left: 5px;
  }

  .sets-data-table .tab span {
    margin: 0 5px;
    line-height: 25px;
    height: 25px;
    display: inline-block;
    cursor: pointer;
  }

  .sets-data-table .tab .isactive {
    font-weight: 600;
    border-bottom: 1px solid #4d4d4d;
  }
</style>
