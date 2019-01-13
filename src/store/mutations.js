import state from './state'
import * as types from './mutation-types'

const mutations = {
  [types.SET_CURRENT_ROUTE_NAME] (state, routeName) {
    state.currentRouteName = routeName
  },
  [types.SET_LOGIN_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_USER_NAME] (state, username) {
    state.user = username
  }
}

export default mutations
