<template>
  <div class="result-p-0 result-company-data">
    <el-table
      :data="tableData3"
      fit
      height="90%"
      style="width: 400px;">
      <el-table-column
        prop="QYMC"
        label="企业名称"
        width="290">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="companyDetail(scope.row)" type="text" size="small">画像</el-button>
          <el-button @click="companyPosition(scope.row)" type="text" size="small">定位</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      small
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Table, TableColumn, Pagination} from 'element-ui';
  import {addHandler, removeHandler, sendMessage} from '@/utils/iframeUtil';

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Pagination)
  export default {
    props: {
      companylist: {type: Object}
    },
    watch: {
      companylist: function (val) {
        if (val.list && val.list.length > 0) {
          this.tableData3 = val.list;
          this.ids = val.ids;
          this.total = val.count;
          this.currentPage = 1;
          this.totalPage = parseInt(val.count / 30);
        } else {
          this.tableData3 = [];
          this.totalPage = 0;
          this.total = 0;
        }
      }
    },
    data() {
      return {
        tableData3: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 30,
        ids: 1,
        total: 0,
        param: {
          /**type ='企业定位' */
          type: '企业定位',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          /**单个企业信息 */
          data: null
        },
        pageParam: {
          /**type ='企业列表分页查询' */
          type: '企业列表分页查询',
          /**当前页面 ='重点企业产业分析' */
          pageName: '重点企业产业分析',
          data: {
            /** 企业标识，某个分页数据key */
            ids: [],
          }
        },
        totalCapitalUnit: '亿'

      }
    },
    methods: {
      setData() {

      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        var mapFrame = this.$parent.$parent.$parent.$parent;
        this.$nextTick(function () {
          if (val > this.totalPage) {
            this.pageParam.data.ids = this.ids.slice(30 * (val - 1), this.total);
          } else {
            this.pageParam.data.ids = this.ids.slice(30 * (val - 1), 30 * (val));
          }
          sendMessage(mapFrame.$refs.mapFrame, this.pageParam);
        });
      },
      companyDetail(val) {
        this.$parent.$parent.$parent.$parent.openCompanyInfoDialog(val);
      },
      companyPosition(val) {
        var mapFrame = this.$parent.$parent.$parent.$parent;
        this.$nextTick(function () {
          this.param.data = val;
          sendMessage(mapFrame.$refs.mapFrame, this.param);
        });
      },
      _receiveMessage(event) {
        if (event.data && event.data.type === "企业列表分页结果") {
          this.tableData3 = event.data.data.list;
        }
      }
    },
    created() {
      addHandler(window, 'message', this._receiveMessage);
    },
    mounted() {

    },
    beforeDestroy() {
      removeHandler(window, 'message', this._receiveMessage);
    }
  }
</script>
<style>
  .result-p-0 {
    padding: 0;
  }

  .result-echart .flow-f {
    float: left;
    width: 50%;
  }

  .result-company-data .el-table {
    font-size: 13px;
  }

  .result-company-data .el-table td {
    padding: 2px 4px;
  }

  .result-company-data .el-table th {
    padding: 4px 6px;
    background: #eef7ff;
  }

  .darkgray .search-result-data .el-pagination .btn-next {
    color: #eee;
    background: #313e4f;
  }

  .darkblue .search-result-data .el-pagination .btn-next {
    color: #fff;
    background: #0f4271;
  }

  .darkgray .search-result-data .el-pagination .btn-prev {
    color: #eee;
    background: #313e4f;
  }

  .darkblue .search-result-data .el-pagination .btn-prev {
    color: #fff;
    background: #0f4271;
  }

  .darkgray .search-result-data .el-pager li {
    color: #eee;
    background: #313e4f;
  }

  .darkblue .search-result-data .el-pager li {
    color: #fff;
    background: #0f4271;
  }

  .darkgray .search-result-data .el-table .hover-row td {
    background: #376998;
  }

  .darkblue .search-result-data .el-table .hover-row td {
    background: #376998;
  }

  .result-company-data {
    height: calc(100% - 1px);
    width: 400px;
  }

  .result-company-data .el-pagination--small .btn-prev {
    line-height: 28px;
    height: 28px;
    font-size: 13px;
    min-width: 16px;
    padding: 0 3px;
  }

  .result-company-data .el-pagination--small .el-pager li {
    line-height: 28px;
    height: 28px;
    min-width: 22px;
    padding: 0 2px;
    font-size: 13px;
  }

  .result-company-data .el-pagination--small .el-pager li:last-child {
    line-height: 28px;
    height: 28px;
    min-width: 22px;
    padding: 0 2px;
    font-size: 13px;
  }

  .result-company-data .el-pagination--small .btn-next {
    line-height: 28px;
    height: 28px;
    font-size: 13px;
    min-width: 16px;
    padding: 0 3px;
  }
</style>
