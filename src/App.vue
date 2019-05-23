<template>
  <div id="app">
    <vs-navbar
      v-bind:value="$route.name"
      color="#17a2b8"
      text-color="#b4dbe3"
      active-text-color="#fdfefe"
      id="globalNavBar"
    >
      <div slot="title">
        <vs-navbar-title>
          RoboMasters.dog
        </vs-navbar-title>
      </div>
      <vs-navbar-item index="current">
        <router-link to="/">现场状态</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="group">
        <router-link to="group">小组积分</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="schedule">
        <router-link to="schedule">所有场次</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="vote">
        <router-link to="vote">投票统计</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="about">
        <router-link to="about">关于</router-link>
      </vs-navbar-item>
      <vs-button color="#FFFFFF" type="float" disabled>当前数据源：{{stage}}</vs-button>
      <vs-button color="#FFFFFF" type="line" @click="zonePrompt = true">选择数据源</vs-button>
      <vs-prompt
        :vs-active.sync="zonePrompt"
        vs-title="选择数据源"
        :vs-buttons-hidden="true"
        >
         <div class="con-exemple-prompt" v-if="zones !== null">
           <vs-button
            style="width:100%;margin-bottom:5px;"
            v-for="(el, index) in zones"
            v-bind:key="index"
            @click="trigZoneChange(index)"
            >
            {{el}}
          </vs-button>
           <vs-button
            style="width:100%;margin-top:15px;"
            href="/2018"
            color="primary"
            type="border"
            >
            2018赛季历史数据
          </vs-button>
         </div>
       </vs-prompt>
    </vs-navbar>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<style>
#globalNavBar {
  color: #FFFFFF;
}

body {
  background: #fdfdfd;
  font-family: 'PingFangSC-Regular', 'Microsoft YaHei', 'Simhei'
}

main {
  margin: 10px 10px 0px 10px;
}
</style>

<script>
export default {
  data () {
    return {
      zonePrompt: false
    }
  },
  methods: {
    updateDjiData () {
      this.$axios.get('//bird.ioliu.cn/v1?url=https://pro-robomasters-hz-n5i3.oss-cn-hangzhou.aliyuncs.com/live_json/current_and_next_matches.json')
        .then(response => {
          this.$store.commit('updateCurrentAndNext', response.data.data.currentAndNextMatches)
        })
      this.$axios.get('//bird.ioliu.cn/v1?url=https://pro-robomasters-hz-n5i3.oss-cn-hangzhou.aliyuncs.com/live_json/groups_order.json')
        .then(response => {
          let _t = {}
          response.data.data.event.zones.nodes.forEach(element => {
            element.groups.nodes.forEach(el => {
              el.players.nodes.sort((a, b) => {
                return a.rank - b.rank
              })
            })
            _t[element.id] = element
          })
          this.$store.commit('updateGroupsOrder', _t)
        })
      this.$axios.get('//bird.ioliu.cn/v1?url=https://pro-robomasters-hz-n5i3.oss-cn-hangzhou.aliyuncs.com/live_json/schedule.json')
        .then(response => {
          let _t = {}
          response.data.data.event.zones.nodes.forEach(element => {
            element.groupMatches.nodes.sort((a, b) => {
              return a.orderNumber - b.orderNumber
            })
            _t[element.id] = element
          })
          this.$store.commit('updateSchedule', _t)
        })
      if (this.$store.getters.voteNeedUpdate) {
        this.$axios.get('/vote.json?_t=' + parseInt(Date.now().toString()))
          .then(response => {
            this.$store.commit('updateVote', response.data)
          })
      }
    },
    updateZones () {
      this.$axios.get('//bird.ioliu.cn/v1?url=https://pro-robomasters-hz-n5i3.oss-cn-hangzhou.aliyuncs.com/live_json/teams.json')
        .then(response => {
          let _t = {}
          response.data.data.event.zones.nodes.forEach(element => {
            _t[element.id] = element.name
          })
          this.$store.commit('updateZones', _t)
        })
    },
    trigZoneChange (zone) {
      this.$store.commit('changeZone', zone)
      this.zonePrompt = false
    }
  },
  mounted () {
    this.updateDjiData()
    this.updateZones()
    this.intervalID = setInterval(() => {
      this.updateDjiData()
    }, 1000 * 30)
  },
  computed: {
    stage () {
      if (this.$store.state.djiData.zones == null) {
        return ''
      }
      return this.$store.state.djiData.zones[this.$store.state.config.zone]
    },
    zones () {
      return this.$store.state.djiData.zones
    }
  }
}
</script>
