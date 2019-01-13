<template>
  <div class="base-info">
    <div>
      <table class="info-table">
        <p v-if="hasData" style="text-align: center;color: #737373;font-size: 16px;">暂无数据</p>
        <table v-else class="info-table">
          <thead>
          <tr>
            <th v-for="item in labelName">{{item.name}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in companyData">
            <td>{{item.column}}</td>
            <td>{{item.value}}</td>
          </tr>
          </tbody>
        </table>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        labelName: [{name: '行业名称'},
          {name: '企业户数'}
        ],
        hasData: false,
        companyData: []
      }
    },
    methods: {
      tabClick() {

      },
      setData(name, data) {
        if (data) {
          this.hasData = false;
          this.companyData = data;
        } else {
          this.hasData = true;
          this.companyData = [];
        }
      }
    },
    created() {

    },
    mounted() {

    }
  }
</script>
