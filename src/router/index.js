import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Login = () => import('../views/login/login')
const MainIndex = () => import('../views/app/main')
const Main = () => import('../views/main/Index')
const ecoOperationMonitoring = () => import('../views/ecoOperationMonitoring/index')
const ecoDataManagement = () => import('../views/ecoDataManagement/index')

const routes = [
  {path: '/', redirect: 'MainIndex/main'},
  // {path: '/login', name: 'login', component: Login},
  {
    path: '/MainIndex', name: 'MainIndex', component: MainIndex, meta: {auth: false},
    children: [
      {
        path: '/MainIndex/main', name: 'index', component: Main, meta: {auth: false},
      },
      {
        path: '/MainIndex/ecoOperationMonitoring', component: ecoOperationMonitoring, meta: {auth: false},
        children: [
          {
            path: '',
            component: () => import('../views/ecoOperationMonitoring/totalMonitor/index.vue'),
            meta: {auth: false},
            children:[
              {
                path: '',
                component: () => import('../views/ecoOperationMonitoring/totalMonitor/enterpriseGdp/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseGdp',
                component: () => import('../views/ecoOperationMonitoring/totalMonitor/enterpriseGdp/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/totalMonitor/enterpriseTax',
                component: () => import('../views/ecoOperationMonitoring/totalMonitor/enterpriseTax/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/totalMonitor/commonRevenue',
                component: () => import('../views/ecoOperationMonitoring/totalMonitor/commonRevenue/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/totalMonitor/inputOutput',
                component: () => import('../views/ecoOperationMonitoring/totalMonitor/inputOutput/index.vue'),
                meta: {auth: false}
              },
            ]
          },
          {
            path: '/MainIndex/ecoOperationMonitoring/zoneMonitor',
            component: () => import('../views/ecoOperationMonitoring/zoneMonitor/index.vue'),
            meta: {auth: false},
            children: [
              {
                path: '',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/professionMarket/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/professionMarketMap',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/professionMarket/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/Incubator',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/Incubator/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/industrialArea',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/industrialArea/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/industrialAreaMap',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/industrialArea/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/zoneMonitor/professionMarket',
                component: () => import('../views/ecoOperationMonitoring/zoneMonitor/professionMarket/index.vue'),
                meta: {auth: false}
              }
            ]
          },
          {
            path: '/MainIndex/ecoOperationMonitoring/industryMonitor',
            component: () => import('../views/ecoOperationMonitoring/industryMonitor/index.vue'), meta: {auth: false},
            children: [
              {
                path: '',//行业总体监测
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/totality/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/totality/map',//行业总体监测【地图】
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/totality/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/industry',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/industry/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/industryMap',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/industry/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/business',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/business/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/businessMap',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/business/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/realEstate',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/realEstate/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/realEstateMap',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/realEstate/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/buildingIndustry',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/buildingIndustry/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/buildingIndustryMap',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/buildingIndustry/map/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/serviceIndustry',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/serviceIndustry/index.vue'),
                meta: {auth: false}
              },
              {
                path: '/MainIndex/ecoOperationMonitoring/industryMonitor/serviceIndustryMap',
                component: () => import('../views/ecoOperationMonitoring/industryMonitor/serviceIndustry/map/index.vue'),
                meta: {auth: false}
              }
            ]
          },
          {
            path: '/MainIndex/ecoOperationMonitoring/keyEnterpriseMonitor',
            component: () => import('../views/ecoOperationMonitoring/keyEnterpriseMonitor/index.vue'), meta: {auth: false}
          },
        ]
      },
      {
        path: '/MainIndex/ecoDataManagement', component: ecoDataManagement, meta: {auth: false},
        children: [
          {
            path: '',
            component: () => import('../views/ecoDataManagement/dataManagement/Index.vue'),
            meta: {auth: false}
          },
          {
            path: '/MainIndex/ecoDataManagement/setsTableManagement',
            component: () => import('../views/ecoDataManagement/setsTableManagement/Index.vue'),
            meta: {auth: false}
          }
        ]
      },
      {
        path: '/MainIndex/spaceAnalysis',
        component: () => import('../views/spaceAnalysis/Index.vue'),
        meta: {auth: false}
      }
    ]
  },
  {
    path: '/error', component: () => import('../views/error/error.vue'), meta: {auth: false}
  }
  /* {
    path: '*', component: Login
  } */
]

const router = new VueRouter({routes})

export default router
