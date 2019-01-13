<template>
  <div class="search-list">
    <div class="input-div" style="width:100px">
      <el-select size="small" v-model="param.data.resourceType" placeholder='资源类型'
                 @change='resourceTypeChange(param.data.resourceType)'>
        <el-option
          v-for='item in resourceOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div style='display: inline-block'>
      <div style='display: inline-block' v-if="param.data.resourceType==='孵化器'">
        <div class='input-div'>
          <el-input
            size='small'
            placeholder='孵化面积'
            v-model='searchParam.data.mj'>
          </el-input>
        </div>
        <div class='input-div'>
          <el-select size='small' clearable v-model='searchParam.data.qgljb' placeholder='孵化器管理级别'
                     @change='industryTypeChange(searchParam.data.qgljb)'>
            <el-option
              v-for='item in provideOptions'
              :key='item.value'
              :label='item.label'
              :value='item.value'>
            </el-option>
          </el-select>
        </div>
      </div>
      <div style='display: inline-block' v-if="param.data.resourceType==='园区'">
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='总占地面积'
            v-model='searchParam.data.zzdmj'>
          </el-input>
        </div>
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='总建筑面积'
            v-model='searchParam.data.zjzmj'>
          </el-input>
        </div>
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='剩余可租赁面积'
            v-model='searchParam.data.sykzlmj'>
          </el-input>
        </div>
        <div class='input-div' style='width:100px'>
          <el-input
            size='small'
            placeholder='租金'
            v-model='searchParam.data.zj'>
          </el-input>
        </div>
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            clearable v-model='searchParam.data.zsfx' placeholder='招商方向'>
          </el-input>
        </div>
      </div>
      <div style='display: inline-block' v-if="param.data.resourceType==='写字楼'">
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='总面积'
            v-model='searchParam.data.zzdmj'>
          </el-input>
        </div>
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='剩余可租赁面积'
            v-model='searchParam.data.sykzlmj'>
          </el-input>
        </div>
        <div class='input-div' style='width:120px'>
          <el-input
            size='small'
            placeholder='租金'
            v-model='searchParam.data.zj'>
          </el-input>
        </div>
        <div class='input-div'>
          <el-input
            size='small'
            clearable v-model='searchParam.data.zsfx' placeholder='招商方向'>
          </el-input>
        </div>
      </div>
    </div>
    <div class='input-div zone-type' style='width:220px'><!--<span class='span-block'>自定义区域：</span>-->
      <el-select style='width:220px' size='small' multiple collapse-tags v-model='param.data.customArea'
                 placeholder='自定义区域' @change='customTypeChange(param.data.customArea)'>
        <el-option
          v-for='item in customAreaTypeOptions'
          :key='item.value'
          :label='item.label'
          :value='item.value'>
        </el-option>
      </el-select>
    </div>
    <div class='input-div' style='position:relativeline-height:18px'><span class='span-block'>街镇选择：</span><span
      class='span-block industry-s' @click.stop='showStreet = !showStreet'>街镇选择
                            <i class='fa fa-unsorted' @click.stop='showStreet = !showStreet'
                               aria-hidden='true'></i></span>
      <div class='choose-street-container' style='z-index: 110' v-show='showStreet'
           @click.stop='showStreetContainer = true'>
        <ul>
          <li @click.stop='onSelectStreet(item)' v-for='item in subdata.streetData'
              class='choose-insudtry-item' :class='{active: item.selected}'>
            <span>{{item.ZJ}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class='input-div' style='position:relativewidth:120px'>
      <el-input
        size='small'
        placeholder='请输入资源名称'
        v-model='searchParam.data.resourceName'>
      </el-input>
    </div>
    <div class='input-div search-btn'>
      <el-button size='small' type='primary' icon='el-icon-search' @click='mapSearch'>查询</el-button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import * as types from '@/store/mutation-types'
  import {sendMessage} from '@/utils/iframeUtil'
  import {Button, Input, Select, Option} from 'element-ui'

  Vue.use(Input)
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Option)
  export default {
    props: {
      subdata: {type: Object}
    },
    data () {
      return {
        streetData: null,
        showIndustry: false,
        showStreet: false,
        resourceName: '',
        dataType: 'year',
        customAreaTypeOptions: [
          {
            value: 0,
            label: '广州生物岛'
          }, {
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
        resourceOptions: [{
          value: '孵化器',
          label: '孵化器'
        }, {
          value: '园区',
          label: '园区'
        }, {
          value: '写字楼',
          label: '写字楼'
        }],
        provideType: '',
        provideOptions: [{
          value: '国家级',
          label: '国家级'
        }, {
          value: '省级',
          label: '省级'
        }, {
          value: '市级',
          label: '市级'
        }, {
          value: '区新型孵化器',
          label: '区新型孵化器'
        }, {
          value: '登记',
          label: '登记'
        }],
        companyTypeOptions: [{
          value: 1,
          label: '内资'
        }, {
          value: 2,
          label: '外资'
        }],
        searchParam: {
          type: '孵化器查询', // 分析类型
          pageName: '楼宇经济分析',
          data: {
            mj: '',
            qgljb: '',
            zzdmj: '',
            zjzmj: '',
            sykzlmj: '',
            zj: '',
            customArea: '',
            street: '',
            resourceName: '',
            zsfx: ''
          }
        },
        param: {
          type: '孵化器查询', // 分析类型
          pageName: '楼宇经济分析',
          data: {
            mj: [parseInt(this.$store.state.spaceAnalysisSearch.startYear), parseInt(this.$store.state.spaceAnalysisSearch.endYear)],//时间范围
            resourceType: '孵化器', // 产业类型
            resourceName: '',
            currentYear: parseInt(this.$store.state.spaceAnalysisSearch.currentYear),//当前年份
          }
        }
      }
    },
    methods: {
      resourceTypeChange(type) {
        var mapFrame = this.$parent.$parent.$parent
        this.searchParam.type = type + '查询'
        mapFrame.$refs.resultData.$refs.building.tabChange(type)
        var param = {
          type: '资源切换',
          pageName: '楼宇经济分析',
          data: {
            resourceType: type
          }
        }
        var values = 1
        if (type === '孵化器') {
          values = 1
        } else if (type === '园区') {
          values = 2
        } else if (type === '写字楼') {
          values = 3
        }
        this.$store.commit(types.SET_RESOURCE_TYPE, values)
        this.$nextTick(function () {
          mapFrame.sendMessage(param)
        })
      },
      industryTypeChange (type) {

      },
      businessTypeChange (type) {

      },
      customTypeChange (type) {

      },
      showIndustryContainer() {

      },
      onSelectStreet (datas) {
        let streetSelected = []
        datas.selected = !datas.selected
        this.subdata.streetData.forEach(datas => {
          datas.selected && streetSelected.push(datas.ZJ)
        })

        this.searchParam.data.street = streetSelected
      },
      closeIndustryContainer () {
        if (this.showStreet) {
          this.showStreet = false
        }
      },
      mapSearch () {
        this.$nextTick(function () {
          var mapFrame = this.$parent.$parent.$parent
          this.searchParam.pageName = mapFrame.activeName
          sendMessage(mapFrame.$refs.mapFrame, this.searchParam)
        })
      }
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
