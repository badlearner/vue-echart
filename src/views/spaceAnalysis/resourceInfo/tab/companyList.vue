<template>
  <div class="base-info">
    <p v-if="hasData" style="text-align: center;color: #737373;font-size: 16px;">暂无数据</p>
    <div v-else class="company-list">
      <h5><strong><span>企业名称</span></strong><span class="float-r">操作</span></h5>
      <div class="list">
        <p v-for="item in companyData">{{item.column}}<span class="float-r"><a @click="companyDetail(item)">画像</a>|<a
          @click="position(item)">定位</a></span></p>
      </div>
    </div>
  </div>
</template>
<script>
  import {addHandler, removeHandler, sendMessage} from '@/utils/iframeUtil';

  export default {
    data() {
      return {
        param: {
          /**type ='企业定位' */
          type: '企业定位',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          /**单个企业信息 */
          data: null
        },
        hasData: false,
        isFromBuild: {},
        companyData: []
      }
    },
    methods: {
      setData(name, data) {
        this.isFromBuild = name;
        if (data) {
          this.hasData = false;
          this.companyData = data;
        } else {
          this.hasData = true;
          this.companyData = [];
        }
      },
      position(value) {
        /*var mapFrame=this.$parent.$parent.$parent.$parent.$parent;
        this.$nextTick(function () {
            this.param.data={
                QYMC:value.column,
                QYZCH:value.value
            };
            mapFrame.dialogResourceInfo=false;
            sendMessage(mapFrame.$refs.mapFrame,this.param);
        });*/
        this.$parent.$parent.$parent.position();
      },
      companyDetail(value) {
        var param = {
          isFromBuild: this.isFromBuild,
          QYMC: value.column,
          QYZCH: value.value
        }
        this.$parent.$parent.$parent.$parent.$parent.openCompanyInfoDialog(param);
      }
    },
    created() {

    },
    mounted() {

    }
  }
</script>
<style>
  .company-list .float-r {
    width: 90px;
    display: inline-block;
    text-align: center;
    float: right;
  }

  .company-list .float-r a {
    padding: 0 8px;
    cursor: pointer;
  }

  .company-list .list {
    width: 100%;
    height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
