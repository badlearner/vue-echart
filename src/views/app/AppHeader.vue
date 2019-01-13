<template>
  <div class="header">
    <div class="logo-wrap-bg">
      <div class="logo-wrap">
        <img class="logo" v-bind:src="logo"/>
        <h3 class="logo-title" style="letter-spacing: 2px">经济数据分析和交换平台</h3>
      </div>
    </div>
    <div class="menus-container">
      <ul class="menus-list">
        <li v-for="view in pageViews" :class="{active : pageView === view.pageName }">
          <div class="menu-bg"></div>
          <router-link class="menu-link" :to="view.to"><span class="menu">{{ view.cnName }}</span></router-link>
        </li>
      </ul>
    </div>
    <div class="url-href"><span id="url-href"></span>
      <!-- <a href="javascript:void(0)" target="_blank" @click="smartUrl()">数据管理</a> -->
    </div>
    <div class="welcome-wrap">
      <!--<div class="change-theme" @click.stop="showChangeTheme = !showChangeTheme">
        <img class="change-theme-icon" :src="changeThemeIcon"/>一键换肤
      </div>-->
      <div class="choose-theme-wrap" v-show="showChangeTheme">
        <ul>
          <li @click.stop="onselectTheme('white')"><span class="theme-item theme_white"></span>白色</li>
          <li @click.stop="onselectTheme('darkgray')"><span class="theme-item theme_darkgray"></span>深灰</li>
          <li @click.stop="onselectTheme('darkblue')"><span class="theme-item theme_darkblue"></span>深蓝</li>
        </ul>
      </div>
      <span class="welcome max-length" :title="userName">欢迎您, {{ userName }}</span>
      <span class="welcome" @click="loginOut()"><i class="fa fa-power-off"></i>退出登录</span>
    </div>
  </div>
</template>
<script>
  import styleUtil, {setTheme} from '@/utils/styleUtil'
  import axios from 'axios'
  import {hrefSmartUrl} from '../../utils/config'
  import * as types from '../../store/mutation-types'

  const changeThemeIcon = require('@/assets/image/theme_change_icon.png')
  const changeThemeActiveIcon = require('@/assets/image/theme_change_active_icon.png')

  export default {
    data() {
      return {
        showChangeTheme: false,
        SmartUrl: hrefSmartUrl,
        userName: '管理员001',
        changeThemeIcon: changeThemeIcon,
        logo: require('@/assets/image/logo_h.png'),
        pageViews: [
          {
            pageName: 'dataDisplay',
            to: '/MainIndex/main',
            cnName: '总体指标一览'},
          {
            pageName: '/MainIndex/ecoOperationMonitoring',
            to: '/MainIndex/ecoOperationMonitoring',
            cnName: '经济运行监测'},
          {
            pageName: '/MainIndex/ecoDataManagement',
            to: '/MainIndex/ecoDataManagement',
            cnName: '经济数据管理'
          },
          {
            pageName: '/MainIndex/spaceAnalysis',
            to: '/MainIndex/spaceAnalysis',
            cnName: '经济空间分析'
          }
        ]
      }
    },
    computed: {
      pageView: {
        get() {
          let currentRouteName = this.$store.state.currentRouteName
          if (currentRouteName === '/MainIndex/main') {
            return 'dataDisplay'
          } else if (currentRouteName === '/MainIndex/ecoOperationMonitoring') {
            return '/MainIndex/ecoOperationMonitoring'
          } else if (currentRouteName === '/MainIndex/ecoDataManagement') {
            return '/MainIndex/ecoDataManagement'
          } else if (currentRouteName === '/MainIndex/spaceAnalysis') {
            return '/MainIndex/spaceAnalysis'
          } else {
            var end = currentRouteName.lastIndexOf('/')
            return currentRouteName.substring(0, end)
          }
        },
        set() {
        }
      }
    },
    watch: {
      showChangeTheme(val) {
        this.changeThemeIcon = val ? changeThemeActiveIcon : changeThemeIcon;
      }
    },
    methods: {
      loginOut () {
        var _this = this
        // this.$store.commit(types.SET_LOGIN_TOKEN, null)
        // window.localStorage.removeItem('token')
        // window.localStorage.removeItem('username')
        // _this.$router.push('/login')
      },
      onselectTheme (theme) {
        setTheme(theme);
        window.location.reload();
      },
      smartUrl () {
        let param = new URLSearchParams();
        param.append('username', 'admin');
        param.append('password', 'admin');
        // var tempWindow=window.open();
        var _this = this;
        axios.post('/EnterpriseBigData/a/login', param).then(result => {
          if (result.data) {
            // tempWindow.location=result.data.obj.url;
            setTimeout(function () {
              _this.openWindow(result.data.obj.url);
            }, 1000);
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '暂不开放!'
            });
          }
        });
      },
      openWindow (url) {
        document.getElementById('url-href').innerHTML = '<a href="' + url + '" target="_blank" id="openWin"></a>';
        document.getElementById('openWin').click();
        document.getElementById('rl-href').removeChild(document.getElementById('openWin'));
      }
    },
    mounted () {
      if (this.$store.state.user) {
        this.userName = this.$store.state.user;
      } else {
        this.userName = window.localStorage.getItem('username');
      }
      document.addEventListener('click', () => {
        this.showChangeTheme = false;
      })
    }
  }
</script>

<style lang="less" scoped>
  .header {
    height: 56px;
  }

  .welcome-wrap {
    position: relative;
    float: right;
    margin-top: 25px;
    font-size: 12px;
  }

  .welcome {
    margin-right: 20px;
    cursor: pointer;

    & .fa-power-off {
      margin-right: 10px;
    }
  }

  .logo-wrap-bg {
    position: relative;
    float: left;
    width: 520px;
    height: 100%;
    border-right: 40px solid transparent;
  }

  .logo-wrap {
    position: absolute;
    top: -56px;
    right: 0;
    bottom: 0;
    left: 10px;
  }

  .logo {
    margin-top: 10px;
    height: 36px;
  }

  .logo-title {
    position: relative;
    top: 10px;
    left: 10px;
    margin: 0;
    padding: 0;
    display: inline;
    line-height: 1;
    font-size: 23px;
  }

  .menus-container {
    position: relative;
    left: -12px;
    float: left;
    min-width: 590px;
    padding-top: 5px;
    text-align: center;
  }

  .menus-list {
    list-style: none;
    display: inline;
  }

  .menus-list > li {
    position: relative;
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    background: transparent;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;

    &.active {
      & > a > .menu {
        font-size: 13px;
        font-weight: 600;
      }
    }
  }

  .menu-link {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .menu {
    position: absolute;
    top: 9px;
    right: 0;
    left: 0;
    font-size: 12px;
  }

  .menu-bg {
    height: 36px;
    width: 140px;
    font-size: 12px;
    -webkit-transform: skew(-35deg);
    -moz-transform: skew(-35deg);
    -o-transform: skew(-35deg);
    -ms-transform: skew(-35deg);
    transform: skew(-35deg);
  }

  .change-theme {
    position: fixed;
    top: 1px;
    right: 20px;
    cursor: pointer;
  }

  .change-theme-icon {
    position: relative;
    top: -1.5px;
    margin-right: 8px;
    height: 13px;
    width: 13px;
  }

  .choose-theme-wrap {
    position: absolute;
    right: 10px;
    padding: 5px;
    width: 90px;
    z-index: 100;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;

    &:after {
      border: 8px solid transparent;
      border-bottom: 8px solid #fff;
      position: absolute;
      content: " ";
      top: 0;
      left: 10px;
      margin-top: -14px;
    }

    & > ul {
      margin: 0;
      list-style: none;

      & > li {
        margin: 5px 0;
        cursor: pointer;
      }
    }
  }

  .theme-item {
    display: inline-block;
    position: relative;
    top: 1px;
    margin-right: 10px;
    height: 12px;
    width: 26px;
    border: 2px solid #dedfe3;
  }

  .max-length {
    display: inline-block;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    margin-right: 10px;
  }

  .theme_white {
    background: #fff;
  }

  .theme_darkblue {
    background: #367ab6;
    border: 1px solid #367ab6;
  }

  .theme_darkgray {
    background: #313e51;
    border: 1px solid #313e51;
  }

  .url-href {
    position: fixed;
    top: 1px;
    right: 124px;
    text-decoration: underline;
  }
</style>
