import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import search from './modules/search'
import spaceAnalysisSearch from './modules/spaceAnalysisSearch'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    search,
    spaceAnalysisSearch
  }
})
