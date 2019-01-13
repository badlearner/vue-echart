<template>
  <div class='search-list'>
    <div class='input-div active-type'><!--<span class='span-block'>活跃度类型：</span>-->
      <el-select size='small' v-model='param.data.activeType' placeholder='活跃度类型'
                 @change='industryTypeChange(param.data.activeType)'>
        <el-option
          v-for='item in movingOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div provide-type'><!--<span class='span-block'>出资状态：</span>-->
      <el-select size='small' clearable v-model='param.data.provideType' placeholder='出资状态'>
        <el-option
          v-for='item in provideOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div company-type'><!--<span class='span-block'>企业类型：</span>-->
      <el-select size='small' clearable v-model='param.data.companyType' placeholder='企业类型'
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
      <el-select size='small' multiple collapse-tags v-model='param.data.customArea' placeholder='自定义区域'
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
            <span>{{ item.ZJ }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='input-div data-year'>
      <year-ranger></year-ranger>
    </div>
    <div class='input-div register-type'><span class='span-block'>注册资本：</span>
      <span class='span-w'><el-input size='small' v-model='param.data.capitalRange[0]' type='number'></el-input></span>
      <span>-</span>
      <span class='span-w'><el-input size='small' v-model='param.data.capitalRange[1]' type='number'></el-input></span>
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
    <div class='input-div' style="width:120;pxposition: relative">
      <com-input></com-input>
    </div>
    <div class='input-div search-btn'>
      <el-button size='small' type='primary' icon='el-icon-search' @click='mapSearch'>查询</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import comInput from './input.vue'
  import yearRanger from './yearRanger.vue'
  import * as types from '@/store/mutation-types'
  import {sendMessage} from '@/utils/iframeUtil'
  import {Button, Input, Select, Option, Popover, Tooltip} from 'element-ui'

  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Option)
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
        dataType: 'year',
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
        movingOptions: [{
          value: 0,
          label: '年报企业'
        }, {
          value: 1,
          label: '活跃企业'
        }],
        provideType: '',
        provideOptions: [{ // 年报企业才会有这个参数
          value: '未缴',
          label: '认缴未缴'
        }, {
          value: '实缴',
          label: '认缴实缴'
        }],
        companyTypeOptions: [{
          value: 1,
          label: '内资'
        }, {
          value: 2,
          label: '外资'
        }],
        customAreaTypeOptions: [{
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
        positionParam: {
          /** type ='企业定位' */
          type: '企业定位',
          /** 当前页面 ='企业活跃度分析' */
          pageName: '企业活跃度分析',
          /** 单个企业信息 */
          data: null
        },
        param: {
          type: '批量企业查询', // 分析类型
          pageName: '企业活跃度分析',
          data: {
            enterpriseName: '', // 企业名称或资源名称
            timeRange: [2011, 2017], // 时间范围
            street: [], // 街镇（多选）
            activeType: 0, // 0 '年报企业'
            provideType: '', // '实缴'|'认缴'
            companyType: '', // 企业类型
            customArea: '', // 自定义区域
            capitalRange: ['', ''], // 注册资本范围
            capitalRangeUnit: '万', // 注册资本单位
            HY: [], // 行业类型多选（多选）
            currentYear: 2016, // 当前年份
          }
        }
      }
    },
    computed: {
      currentYear: {
        get () {
          return this.subdata.currentYear
        },
        set (value) {
          this.$store.commit(types.SET_CURRENT_YEAR, value)
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
        } else if (values.substring(0, index) != null && values.substring(0, index) != '') {
          this.param.data.capitalRange[0] = parseInt(values.substring(0, index))
          this.param.data.capitalRange[1] = parseInt(values.substring(index + 1, values.length))
        }
        this.visible2 = false
      },
      industryTypeChange (type) {
        var mapFrame = this.$parent.$parent.$parent
        // this.searchParam.type=type+'查询'
        // mapFrame.$refs.resultData.$refs.building.tabChange(type)
        var param = {
          type: '图层切换',
          pageName: '企业活跃分析',
          data: {
            activeType: type
          }
        }
        this.$nextTick(function () {
          mapFrame.sendMessage(param)
        })
      },
      companyTypeChange (type) {

      },
      customTypeChange (type) {

      },
      showIndustryContainer () {

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
      mapSearch () {
        this.$nextTick(function () {
          var mapFrame = this.$parent.$parent.$parent
          this.param.pageName = mapFrame.activeName
          this.param.data.timeRange[0] = parseInt(this.$store.state.spaceAnalysisSearch.startYear)
          this.param.data.timeRange[1] = parseInt(this.$store.state.spaceAnalysisSearch.endYear)
          if (this.param.data.capitalRange[0] != '' && this.param.data.capitalRange[0] != null) {
            this.param.data.capitalRange[0] = parseFloat(this.param.data.capitalRange[0])
          }
          if (this.param.data.capitalRange[1] != '' && this.param.data.capitalRange[1] != null) {
            this.param.data.capitalRange[1] = parseFloat(this.param.data.capitalRange[1])
          }
          this.param.data.currentYear = parseInt(this.$store.state.spaceAnalysisSearch.currentYear)
          sendMessage(mapFrame.$refs.mapFrame, this.param)
        })
      }
    },
    created () {
    },
    mounted () {
      document.addEventListener('click', this.closeIndustryContainer)
    },
    deactivated () {
    },
    beforeDestroy () {
      document.removeEventListener('click', this.closeIndustryContainer)
    }
  }
</script>
