import * as types from '../mutation-types'

const state = {
  startYear: 2011,
  endYear: 2017,
  currentYear: 2017,
  buildType: 1
}
const mutations = {
  [types.SET_START_YEAR] (state, startYear) {
    state.startYear = startYear
  },

  [types.SET_END_YEAR] (state, endYear) {
    state.endYear = endYear
  },

  [types.SET_CURRENT_YEAR] (state, currentYear) {
    state.currentYear = currentYear
  },
  [types.SET_RESOURCE_TYPE] (state, type) {
    state.buildType = type
  }
}
export default {
  state,
  mutations
}
