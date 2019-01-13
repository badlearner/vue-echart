<template>
  <div style="position: relative;width:100%;">
    <span class="span-block">年份：</span>
    <span class="span-w"><el-date-picker size="small" v-model="startYear" @change="yearStartChange(startYear)"
                                         value-format="yyyy" :type="dataType" :editable="false"
                                         :clearable="false"/></span>
    <span>-</span>
    <span class="span-w"><el-date-picker size="small" v-model="endYear" @change="yearEndChange(endYear)"
                                         value-format="yyyy" :type="dataType" :editable="false"
                                         :clearable="false"/></span>
  </div>
</template>
<script>
  import * as types from '@/store/mutation-types';

  export default {
    data () {
      return {
        dataType: 'year',
        currentYear: ''
      }
    },
    computed: {
      startYear: {
        get () {
          return (this.$store.state.spaceAnalysisSearch.startYear).toString();
        },
        set (value) {
          this.$store.commit(types.SET_START_YEAR, value);
        }
      },
      endYear: {
        get () {
          return (this.$store.state.spaceAnalysisSearch.endYear).toString();
        },
        set (value) {
          this.$store.commit(types.SET_END_YEAR, value);
        }
      }
    },
    methods: {
      yearStartChange (value) {
        if (parseInt(value) < 1980) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '开始年份早于1980年!',
          });
          this.startYear = (this.subdata.data.timeRange[0]).toString();
        } else if (parseInt(this.endYear) < parseInt(value) || parseInt(this.endYear) === parseInt(value)) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '开始年份不能晚于结束年份!'
          });
          this.startYear = (this.subdata.data.timeRange[0]).toString();
        } else {
          this.$store.commit(types.SET_START_YEAR, value);
          this.$parent.$parent.$parent.$parent.$refs.yearChange.yearChange(parseInt(this.currentYear));
          this.$parent.$parent.$parent.$parent.$refs.yearChange.yearClearInterval();
        }
      },
      yearEndChange (value) {
        if (parseInt(value) < parseInt(this.currentYear)) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '结束年份不能小于' + this.currentYear + '年!'
          });
          this.endYear = (this.subdata.data.timeRange[1]).toString();
        } else if (parseInt(value) < parseInt(this.startYear) || parseInt(value) === parseInt(this.startYear)) {
          this.$message({
            showClose: true,
            type: 'error',
            message: '结束年份不能早于开始年份!'
          });
          this.endYear = (this.subdata.data.timeRange[1]).toString();
        } else {
          this.$store.commit(types.SET_END_YEAR, value);
          this.$parent.$parent.$parent.$parent.$refs.yearChange.yearChange(parseInt(this.currentYear));
          this.$parent.$parent.$parent.$parent.$refs.yearChange.yearClearInterval();
        }
      }
    },
    mounted () {
      this.startYear = (this.$store.state.spaceAnalysisSearch.startYear).toString();
      this.endYear = (this.$store.state.spaceAnalysisSearch.endYear).toString();
      this.currentYear = (this.$store.state.spaceAnalysisSearch.currentYear).toString();
    }
  }
</script>
