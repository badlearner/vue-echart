<template>
  <div class="result-p-0 result-company-data">
    <el-table
      :data="tableData3"
      fit
      height="90%" style="width:400px;">
      <el-table-column
        prop="name"
        label="资源名称" :width="fristWidths">
      </el-table-column>
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.name" :label="item.alias"
                       :width="widths"></el-table-column>
      <!--            <el-table-column
                          prop="ZJ"
                          label="租金(元)"
                          width="100">
                  </el-table-column>-->
      <el-table-column
        label="操作"
        :width="widths">
        <template slot-scope="scope">
          <span @click="companyDetail(scope.row)" style="cursor: pointer;color:#409eff;padding:3px 3px 3px 0;">画像</span>
          <span @click="companyPosition(scope.row)" style="cursor: pointer;color:#409eff;">定位</span>
        </template>
      </el-table-column>
    </el-table>
    <div style="position: relative;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
      <span style="position: absolute;bottom:5px;right:0px;">当前页：{{currentPage}}</span>
    </div>
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
      buildingecolist: {type: Object}
    },
    watch: {
      buildingecolist: function (val) {
        if (val.list && val.list.length > 0) {
          for (var i = 0; i < val.list.length; i++) {
            val.list[i].DKMC = val.list[i].FHQMC ? val.list[i].FHQMC : val.list[i].YQMC;
          }
          this.tableData3 = val.list;
          if (val.ids && val.count) {
            this.ids = val.ids;
            this.total = val.count;
            this.currentPage = 1;
            this.totalPage = parseInt(val.count / 30);
          }
          if (val.columns) {
            this.columns = val.columns.slice(1, val.columns.length);
            if (this.columns.length == 2) {
              this.fristWidths = 130;
              this.widths = 90;
            } else if (this.columns.length == 1) {
              this.fristWidths = 160;
              this.widths = 120;
            }
          }
        } else {
          this.tableData3 = [];
        }
      }
    },
    data() {
      return {
        tableData3: [],
        currentPage: 1,
        totalPage: 0,
        pageSize: 30,
        widths: 90,
        fristWidths: 130,
        ids: 1,
        total: 0,
        columns: [],
        totalCapitalUnit: '亿',
        param: {
          type: '企业定位',
          pageName: '楼宇经济分析',
          /**单个企业信息 */
          data: ''
        },
        pageParam: {
          type: '企业列表分页查询',
          pageName: '楼宇经济分析',
          data: {
            /**分页结果，前台需 */
            ids: [],
          }
        }
      }
    },
    methods: {
      setData() {

      },
      handleSizeChange(val) {
        this.currentPage = val;
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
        this.$parent.$parent.$parent.$parent.openResourceInfoDialog(val);
      },
      companyPosition(val) {
        var mapFrame = this.$parent.$parent.$parent.$parent;
        this.$nextTick(function () {
          this.param.data = val;
          sendMessage(mapFrame.$refs.mapFrame, this.param);
        });
      }
    },
    created() {

    },
    mounted() {
    }
  }
</script>
<style>
  .darkblue .el-table th {
    background: #0b375e;
    border: none;
  }

  .darkblue .el-table th .cell {
    color: #f8fffd;
  }

  .darkblue .el-table td {
    border-bottom: none;
  }

  .darkblue .el-table td .cell {
    color: #f8fffd;
  }

  .darkblue .el-table {
    background: #0f4271;
  }

  .darkblue .el-table:before {
    height: 0;
  }

  .darkblue .el-table__fixed-right:before {
    height: 0;
  }

  .darkblue .el-table .el-table__body .el-table__row:hover td {
    background: #376998;
  }

  .darkblue .el-table tr:nth-child(odd) {
    background: #0f4271;
  }

  .darkblue .el-table tr:nth-child(even) {
    background: #1f5e98;
  }

  .darkgray .el-table th {
    background: #273440;
    border: none;
  }

  .darkgray .el-table th .cell {
    color: #d4d4d4;
  }

  .darkgray .el-table td {
    border-bottom: none;
  }

  .darkgray .el-table td .cell {
    color: #d4d4d4;
  }

  .darkgray .el-table {
    background: #313e4f;
  }

  .darkgray .el-table:before {
    height: 0;
  }

  .darkgray .el-table__fixed-right:before {
    height: 0;
  }

  .darkgray .el-table .el-table__body .el-table__row:hover td {
    background: #376998;
  }

  .darkgray .el-table tr:nth-child(odd) {
    background: #313e4f;
  }

  .darkgray .el-table tr:nth-child(even) {
    background: #3d4c63;
  }

  .result-company-data .el-table .cell {
    padding: 0 3px;
  }

</style>
