<template>
  <div class='search-list'>
    <div class='input-div industry-type' v-if=''><!--<span class='span-block'>产业类型：</span>-->
      <el-select size='small' v-model='industryType' placeholder='产业类型' @change='industryTypeChange(industryType)'>
        <el-option
          v-for='item in industryTypeOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div company-type'><!--<span class='span-block'>企业类型：</span>-->
      <el-select size='small' v-model='param.data.companyType' clearable placeholder='企业类型'
                 @change='companyTypeChange(param.data.companyType)'>
        <el-option
          v-for='item in companyTypeOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div zone-type'><!--<span class='span-block'>自定义区域：</span>-->
      <el-select size='small' v-model='param.data.customArea' multiple collapse-tags clearable placeholder='自定义区域'
                 @change='customTypeChange(param.data.customArea)'>
        <el-option
          v-for='item in customAreaTypeOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div' style='position:relative'><span class='span-block'>行业类型：</span><span
      class='span-block industry-s' @click.stop='showIndustry = !showIndustry'>行业选择
                            <i class='fa fa-unsorted' @click.stop='showIndustry = !showIndustry'
                               aria-hidden='true'></i></span>
      <div class='choose-industry-container' v-show='showIndustry'
           @click.stop='showIndustryContainer = true'>
        <ul>
          <li @click.stop='onSelectIndustry(item)' v-for='item in subdata.industryData'
              class='choose-insudtry-item' :class='{active: item.selected}'>
            <span>{{ item.HYMC }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='input-div' style='position:relative'><span class='span-block'>街镇选择：</span><span
      class='span-block industry-s' @click.stop='showStreet = !showStreet'>街镇选择
                            <i class='fa fa-unsorted' @click.stop='showStreet = !showStreet'
                               aria-hidden='true'></i></span>
      <div class='choose-street-container' v-show='showStreet'
           @click.stop='showStreetContainer = true'>
        <ul>
          <li @click.stop='onSelectStreet(item)' v-for='item in subdata.streetData'
              class='choose-insudtry-item' :class='{active: item.selected}'>
            <span>{{item.ZJ}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='input-div data-year'>
      <year-ranger></year-ranger>
    </div>
    <div class='input-div register-type'>
      <span class='span-block'>注册资本：</span>
      <span class='span-w'><el-input size='small' @change='startCapital(param.data.capitalRange[0])'
                                     v-model='param.data.capitalRange[0]' type='number'></el-input></span>
      <span>-</span>
      <span class='span-w'><el-input size='small' @change='endCapital(param.data.capitalRange[1])'
                                     v-model='param.data.capitalRange[1]' type='number'></el-input></span>
      <span class='cursor-p' @click='moneyChose()'>范围</span>
      <el-popover
        v-model='visible2'
        placement='bottom'
        width='200'
        trigger='click'>
        <el-select size='small' v-model='manyValue' clearable placeholder='资本范围' @change='moneySelecte(manyValue)'>
          <el-option
            v-for='item in manyValueOptions'
            :key='item.value'
            :label='item.label'
            :value='item.value'>
          </el-option>
        </el-select>
      </el-popover>
    </div>
    <div class='input-div' style='position: relative'>
      <com-input></com-input>
    </div>
    <div class='input-div search-btn'>
      <el-button size='small' type='primary' icon='el-icon-search' @click="mapSearch({type:'批量企业查询'})">查询</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import comInput from './input.vue'
  import yearRanger from './yearRanger.vue'
  import service from '@/services/index'
  import spanceService from '@/services/spaceAnalysis/spaceAnalysis'
  import * as types from '@/store/mutation-types'
  import localStorageUtil from '@/utils/localStorageUtil'
  import {addHandler, removeHandler, sendMessage} from '@/utils/iframeUtil'
  import {Button, Input, Select, Option, Autocomplete, Popover, Tooltip} from 'element-ui'

  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Autocomplete)
  Vue.use(Popover)
  Vue.use(Tooltip)
  export default {
    props: {
      subdata: {type: Object}
    },
    components: {
      comInput,
      yearRanger
    },
    data () {
      return {
        industryData: null,
        streetData: null,
        showIndustry: false,
        showStreet: false,
        visible: false,
        visible2: false,
        manyValue: '不限',
        manyValueOptions: [{
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
        industryTypeOptions: [{
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
          label: '科技类'
        }, {
          value: 'IS_WHY',
          label: '文化类'
        }, {
          value: 'IS_SMY',
          label: '商贸类'
        }, {
          value: 'IS_HZY',
          label: '会展类'
        }],
        industryType: '',
        companyTypeOptions: [{
          value: 1,
          label: '内资'
        }, {
          value: 2,
          label: '外资'
        }],
        customAreaTypeOptions: [
          {
            value: 0,
            label: '广州生物岛'
          }
          , {
            value: 1,
            label: '琶洲地区—黄埔涌'
          }, {
            value: 2,
            label: '琶洲地区—西区'
          }, {
            value: 3,
            label: '沥滘'
          }, {
            value: 4,
            label: '海珠生态城启动区规划范围'
          }],
        param: {
          type: '批量企业查询', // 分析类型
          pageName: '重点企业产业分析',
          data: {
            enterpriseName: '', // 企业名称或资源名称
            timeRange: [2011, 2017], // 时间范围
            street: [], // 街镇（多选）
            industryType: '', // 产业类型
            companyType: '', // 企业类型
            customArea: '', // 自定义区域
            capitalRange: ['', ''], // 注册资本范围
            capitalRangeUnit: '万', // 注册资本单位
            HY: [], // 行业类型多选（多选）
            currentYear: 2016 // 当前年份
          }
        }
      }
    },
    methods: {
      moneyChose () {
        this.visible2 = true
      },
      moneySelecte (values) {
        var index = values.lastIndexOf(',')
        if (values === '不限') {
          this.param.data.capitalRange[0] = ''
          this.param.data.capitalRange[1] = ''
        } else if (values === '100000') {
          this.param.data.capitalRange[0] = parseInt(values)
          this.param.data.capitalRange[1] = ''
        } else if (values.substring(0, index) !== null && values.substring(0, index) !== '') {
          this.param.data.capitalRange[0] = parseInt(values.substring(0, index))
          this.param.data.capitalRange[1] = parseInt(values.substring(index + 1, values.length))
        }
        this.visible2 = false
      },
      industryTypeChange (type) {
        this.param.data.industryType = type
        this.mapSearch({type: '批量企业查询'})
      },
      companyTypeChange (type) {
        this.param.data.companyType = type
        this.mapSearch({type: '批量企业查询'})
      },
      customTypeChange (type) {

      },
      getIndustryTypeData () {
        spanceService.getIndustryTypeData().then(result => {
          this.industryTypeOptions = result
        })
      },
      startCapital (item) {
        var value = parseInt(item)
        var endValue = parseInt(this.param.data.capitalRange[1])
        if (value > endValue) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '注册资本开始值不能大于最大值!'
          })
        }
        if (value < 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '注册资本开始值不能小于0!'
          })
        }
      },
      endCapital (item) {
        var value = parseInt(item)
        var beginValue = parseInt(this.param.data.capitalRange[0])
        if (value < beginValue) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '注册资本最大值不能小于开始值!'
          })
        }
        if (value < 0) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '注册资本最大值不能小于0!'
          })
        }
      },
      onSelectIndustry (datas) {
        let selected = []
        datas.selected = !datas.selected
        this.subdata.industryData.forEach(datas => {
          datas.selected && selected.push(datas.HYDM)
        })

        this.param.data.HY = selected
      },
      onSelectStreet (datas) {
        let streetSelected = []
        datas.selected = !datas.selected
        this.subdata.streetData.forEach(datas => {
          datas.selected && streetSelected.push(datas.ZJ)
        })

        this.param.data.street = streetSelected
      },
      closeIndustryContainer () {
        if (this.showIndustry) {
          this.showIndustry = false
        }
        if (this.showStreet) {
          this.showStreet = false
        }
      },
      mapSearch (type) {
        this.param.type = type.type
        this.param.data.timeRange[0] = parseInt(this.$store.state.spaceAnalysisSearch.startYear)
        this.param.data.timeRange[1] = parseInt(this.$store.state.spaceAnalysisSearch.endYear)
        if (this.param.data.capitalRange[0] != '' && this.param.data.capitalRange[0] != null) {
          this.param.data.capitalRange[0] = parseFloat(this.param.data.capitalRange[0])
        }
        if (this.param.data.capitalRange[1] != '' && this.param.data.capitalRange[1] != null) {
          this.param.data.capitalRange[1] = parseFloat(this.param.data.capitalRange[1])
        }
        this.param.data.currentYear = parseInt(this.$store.state.spaceAnalysisSearch.currentYear)
        this.$nextTick(function () {
          var mapFrame = this.$parent.$parent.$parent
          this.param.pageName = mapFrame.activeName
          mapFrame.sendMessage(this.param)
        })
      }
    },
    created () {
    },
    mounted () {
      document.addEventListener('click', this.closeIndustryContainer)
      this.getIndustryTypeData()
      spanceService.getCompanyTypeData().then(result => {
        this.companyTypeOptions === result
      })
    },
    deactivated () {
    },
    beforeDestroy () {
      document.removeEventListener('click', this.closeIndustryContainer)
    }
  }
</script>
<style>
  .el-autocomplete-suggestion .el-scrollbar li {
    line-height: 28px;
    padding: 0 3px;
    font-size: 12px;
  }

  .el-autocomplete-suggestion .el-scrollbar .name {
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0;
  }

  .darkblue .el-autocomplete-suggestion {
    background: #1e6ec3;
  }

</style>
