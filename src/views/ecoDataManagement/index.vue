<template>
  <div>
    <div class="economic-data-container">
      <div class="pull-left">
        <ul class="economic-data-analysis-nav">
          <li v-for="page in analysisNavs" :class="{active: pageView === page.pageView}">
            <router-link :to="{path: page.to}">
              <span>{{ page.cnName }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view class="economic-nav-content"></router-view>
  </div>
</template>
<script>
  import service from '@/services/index';
  import * as types from '@/store/mutation-types';
  import localStorageUtil from '@/utils/localStorageUtil';
  export default {
    computed: {
      pageView: {
        get() {
          let currentRouteName = this.$store.state.currentRouteName;
          return currentRouteName
        }
      }
    },
    data() {
      return {
        analysisNavs: [
          {
            pageView: '/MainIndex/ecoDataManagement',
            to: '/MainIndex/ecoDataManagement',
            cnName: '数据管理',
          },
          {
            pageView: '/MainIndex/ecoDataManagement/setsTableManagement',
            to: '/MainIndex/ecoDataManagement/setsTableManagement',
            cnName: '套表管理'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .economic-data-container {
    height: 42px;
    padding: 0 0 0 25px;
    font-size: 12px;
  }
  .economic-data-analysis-nav {
    display: inline;
    list-style: none;

    & > li {
      position: relative;
      display: inline-block;
      margin: 0 6px;
      padding: 10px 0;
      color: #666;
      font-size: 13px;
      cursor: pointer;
    }

    & > li > a {
      text-decoration: none;
    }

    & > li.active span {
      padding-bottom: 12px;
      border-bottom: 2px solid #666;
    }

    & > li span {
      padding-bottom: 12px;
      color: #333;
    }
  }
</style>
