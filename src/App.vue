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
      <vs-navbar-item>
        <a href="/2018">2018赛季历史数据</a>
      </vs-navbar-item>
      <vs-button color="#FFFFFF" type="float" disabled>当前数据源：现场实况</vs-button>
      <vs-button color="#FFFFFF" type="line" disabled>选择数据源</vs-button>
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
    }
  },
  mounted () {
    this.updateDjiData()
    this.intervalID = setInterval(() => {
      this.updateDjiData()
    }, 1000 * 30)
  }
}
</script>
