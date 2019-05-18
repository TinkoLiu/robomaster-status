import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    djiData: {
      current_and_next: null,
      schedule: null,
      groups_order: null
    },
    config: {
      zone: 1
    }
  },
  mutations: {
    updateCurrentAndNext (state, payload) {
      state.djiData.current_and_next = payload
    },
    updateSchedule (state, payload) {
      state.djiData.schedule = payload
    },
    updateGroupsOrder (state, payload) {
      state.djiData.groups_order = payload
    }
  },
  actions: {

  },
  getters: {
    groupsOrder: state => {
      if (state.djiData.groups_order) {
        return state.djiData.groups_order[state.config.zone].groups.nodes
      }
      return null
    }
  }
})
