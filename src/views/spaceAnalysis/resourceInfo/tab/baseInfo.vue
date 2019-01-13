<template>
  <div class="base-info">
    <div class="float-l" style="width:100%;">
      <p v-if="isData"><strong>资源名称:</strong><span>{{resourceName}}</span></p>
      <p v-for="item in baseInfo"><strong>{{item.column}}：</strong><span>{{item.value}}</span></p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        baseInfo: '',
        isData: false,
        resourceName: ''
      }
    },
    methods: {
      tabClick() {

      },
      setData(name, data) {
        this.resourceName = name;
        if (data) {
          this.baseInfo = data;
          this.isData = false;
        } else {
          this.isData = true;
          this.baseInfo = {};
        }
      }
    },
    created() {

    },
    mounted() {

    }
  }
</script>
<style>
  .base-info .float-l {
    float: left;
  }

  .base-info p {
    color: #333;
  }
</style>
