import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    djiData: {
      current_and_next: null,
      schedule: null,
      groups_order: null,
      vote: {
        lastUpdate: 0,
        option: null
      }
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
    },
    updateVote (state, payload) {
      state.djiData.vote.option = payload
      state.djiData.vote.lastUpdate = parseInt(Date.now() / 1000)
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
    },
    voteNeedUpdate: state => {
      let _now = Date.now() / 1000
      if (_now - state.djiData.vote.lastUpdate > 1800) {
        return true
      }
      return false
    }
  }
})
