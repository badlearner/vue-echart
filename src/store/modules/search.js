import * as types from '../mutation-types'

const state = {
  startDate: '2012',
  endDate: '2017',
  searchType: '4',
  enterpriseType: '0'
}

const mutations = {
  [types.SET_SEARCH_START_DATE] (state, startDate) {
    state.startDate = startDate
  },

  [types.SET_SEARCH_END_DATE] (state, endDate) {
    state.endDate = endDate
  },

  [types.SET_SEARCH_TYPE] (state, searchType) {
    state.searchType = searchType
  },

  [types.SET_ENTERPRISE_TYPE] (state, type) {
    state.enterpriseType = type
  }
}

export default {
  state,
  mutations
}
