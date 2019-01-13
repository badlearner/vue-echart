<template>
  <div class="base-info">
    <div class="float-l">
      <p><span>企业名称：</span><span>{{companyName}}</span></p>
      <p><span>成立日期：</span><span>{{baseInfo.clrq}}</span></p>
      <p><span>注册资本：</span><span>{{baseInfo.rmbzczb}}</span></p>
      <p><span>企业法人：</span><span>{{baseInfo.qyfr}}</span></p>
      <p><span>工商注册号：</span><span>{{baseInfo.qyzch}}</span></p>
      <p><span>企业地址：</span><span>{{baseInfo.address}}</span></p>
    </div>
    <div class="float-l">
      <p><span>企业类型：</span><span>{{baseInfo.qylx}}</span></p>
      <p><span>所属行业：</span><span>{{baseInfo.hymc}}</span></p>
      <!-- <p><span>组织机构代码：</span><span>{{baseInfo.qyzch}}</span></p>-->
      <p><span>社会信用代码：</span><span>{{baseInfo.shxydm}}</span></p>
      <!--<p><span>国税登记号码：</span><span>{{baseInfo.qyzch}}</span></p>-->
      <!-- <p><span>地税登记号码：</span><span>{{baseInfo.qyzch}}</span></p>-->
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        baseInfo: {
          qymc: '',
          clrq: ''
        },
        companyName: ''
      }
    },
    methods: {
      tabClick () {

      },
      setData (data) {
        this.companyName = data.name;
        if (data.data) {
          this.baseInfo = data.data;
        } else {
          this.baseInfo = {};
        }
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
<style>
  .base-info .float-l {
    float: left;
    margin-top: 15px;
    width: 50%;
  }

  .base-info p {
    color: #333;
  }
</style>
