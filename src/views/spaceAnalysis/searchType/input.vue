<template>
  <div style="position: relative;width:100%;">
    <el-input
      size="small"
      placeholder="请输入企业名称"
      v-model="enterpriseName">
    </el-input>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {sendMessage} from '@/utils/iframeUtil'
  import {Input} from 'element-ui'

  Vue.use(Input)
  export default {
    watch: {
      enterpriseName: function (val) {
        if (val !== '' && val !== null) {
          this.querySearch(val)
        }
      }
    },
    data () {
      return {
        positionParam: {
          /** type ='企业定位' */
          type: '企业定位',
          /** 当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          /** 单个企业信息 */
          data: null
        },
        enterpriseName: '',
        hasData: false
      }
    },
    methods: {
      querySearch (queryString) {
        var mapFrame = this.$parent.$parent.$parent.$parent
        let queryParam = {
          /** type ='单个企业模糊查询' */
          type: '单个企业模糊查询',
          /** 当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          data: {
            enterpriseName: queryString
          }
        };
        sendMessage(mapFrame.$refs.mapFrame, queryParam)
      }
    },
    mounted () {

    },
    beforeDestroy () {

    }
  }
</script>
