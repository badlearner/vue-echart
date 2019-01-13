<template>
  <div>
    <LoadingBar :on-error-done="errorDone"
                :on-progress-done="progressDone"
                :progress="progress"
                :error="error">
    </LoadingBar>
    <AppHeader></AppHeader>
    <router-view class="main-head"></router-view>
  </div>
</template>

<script>
  import AppHeader from './AppHeader'
  import LoadingBar from 'vue2-loading-bar'
  import {getCurrentTheme} from '@/utils/styleUtil'

  export default {
    data () {
      return {
        progress: 0,
        error: false
      }
    },
    components: {
      AppHeader,
      LoadingBar
    },
    methods: {
      errorDone () {
        this.error = false
      },
      progressDone () {
        this.progress = 0
      },
      progressTo (val) {
        this.progress = val
      },
      setLoadingBarOnError () {
        this.error = true
      }
    },
    created () {
       this.$root.eventHub.$on('progressTo', this.progressTo)
       this.$root.eventHub.$on('progressOnError', this.setLoadingBarOnError)
    },
    mounted () {
      let theme = getCurrentTheme()
      document.body.classList.add(theme)
    },
    beforeDestroy () {
       this.$root.eventHub.$off('progressTo', this.progressTo)
       this.$root.eventHub.$off('progressOnError', this.setLoadingBarOnError)
    }
  }
</script>

<style>
  .main-head {
    position: relative;
    height: calc(100% - 60px);
    width: 100%;
  }

  .economic-nav-content {
    padding: 0 5px 5px 5px;
    height: calc(100% - 42px);
  }

  .height-inherit {
    height: 100%;
  }

  .main-head .echarts {
    padding: 5px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    height: 100%;
    width: 100%;
  }

  .chart-dot {
    display: inline-block;
    margin-right: 5px;
    border-radius: 10px;
    width: 9px;
    height: 9px;
  }

  .chart-tooltip {
    color: #eee;
    font-size: 13px;
  }

  .chart-tooltip .name,
  .chart-tooltip .increment,
  .chart-tooltip .growth {
    display: inline-block;
    padding: 3px 5px;
  }

  .k-red {
    color: red;
    margin-right: 3px;
  }

  .k-green {
    color: #13e613;
    margin-right: 3px;
  }

  .map-tab {
    margin: 0;
    height: 40px;
    list-style: none;
    z-index: 2;
  }

  .map-tab > li {
    margin: 0 10px;
    display: inline-block;
    cursor: pointer;
  }

  .map-tab > li > span {
    box-sizing: border-box;
    display: inline-block;
    padding: 0px 5px;
    text-decoration: none;
    cursor: pointer;
  }

  .map-tab > li > span.active {
    font-weight: 600;
  }

  .margin-top-10 {
    margin-top: 10px;
  }

  .margin-top-5 {
    margin-top: 5px;
  }

  .margin-left-5 {
    margin-left: 10px;
  }

  .absolute {
    position: absolute;
  }

  .LoadingBar {
    transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    position: fixed;
    top: 0;
    background: #1af184;
    height: 3px;
    opacity: 1;
    z-index: 100;
  }

  .LoadingBar-glow {
    top: 0;
    position: absolute;
    width: 100px;
    height: 100%;
    box-shadow: -3px 0 15px 1px rgba(0, 255, 231, 0.4);
  }

  .LoadingBar--to_right {
    left: 0;
  }

  .LoadingBar--to_left,
  .LoadingBar--to_right .LoadingBar-glow {
    right: 0;
  }

  .LoadingBar--to_left .LoadingBar-glow {
    left: 0;
  }

  .LoadingBar--full {
    transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -webkit-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    height: 0;
    opacity: 0;
  }

  .LoadingBar--error {
    background: #f44336;
  }

  .LoadingBar--error .LoadingBar-glow {
    box-shadow: -3px 0 15px 1px rgba(244, 67, 54, 0.4);
  }

</style>
