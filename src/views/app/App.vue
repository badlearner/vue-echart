<template>
  <div class="main-container">
    <router-view class="main-content"></router-view>
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
  body {
    font-family: Microsoft YaHei;
    font-size: 13px;
    line-height: 1.5;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  html {
    height: 100%;
    width: 100%;
  }

  *,
  body {
    margin: 0;
    padding: 0;
  }

  .font-12 {
    font-size: 12px;
  }

  .font-13 {
    font-size: 13px;
  }

  .font-14 {
    font-size: 14px;
  }

  .font-15 {
    font-size: 15px;
  }

  .font-16 {
    font-size: 16px;
  }

  .font-22 {
    font-size: 22px;
  }

  .font-24 {
    font-size: 24px;
  }

  .main-container {
    position: relative;
    min-width: 1280px;
    min-height: 650px;
    height: 100%;
    width: 100%;
  }

  .main-content {
    position: relative;
    height: 100%;
    min-height: 600px;
    width: 100%;
    overflow: hidden;
  }

</style>
