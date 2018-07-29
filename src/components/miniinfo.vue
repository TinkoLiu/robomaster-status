<template>
  <main @click="trigVS(gameid, redid, blueid)">
    <span v-if="stage=='group'">{{group}}组 {{group_player}}</span>
    <span v-if="stage=='1/8'">八分之一赛</span>
    <span v-if="stage=='13_16'">13-16排位赛</span>
    <span v-if="stage=='1/4'">四分之一赛</span>
    <span v-if="stage=='5_8'">5-8排位赛</span>
    <span v-if="stage=='9_12'">9-12排位赛</span>
    <span v-if="stage=='semifinal'">半决赛</span>
    <span v-if="stage=='third_place'">季军赛</span>
    <span v-if="stage=='final'">决赛</span>
    <br>
    <span>比分</span>
    <h1>{{score}}</h1>
    <br>
    <span>预计开始时间</span>
    <br>
    <span>{{getExpectedStartDate()}}</span>
    <br>
    <span>{{getExpectedStartTime()}}</span>
  </main>
</template>

<script>
var moment = require('moment')
export default {
  name: 'miniinfo',
  props: [
    'group',
    'expected_start',
    'group_player',
    'score',
    'round',
    'stage',
    'redid',
    'blueid',
    'gameid'
  ],
  methods: {
    getExpectedStartDate: function () {
      return moment(this.expected_start).format('YYYY-MM-DD')
    },
    getExpectedStartTime: function () {
      return moment(this.expected_start).format('HH:mm:ss')
    },
    trigVS: function (gameid, redid, blueid) {
      this.$parent.$root.$children[0].updateTeamVSModal(gameid, redid, blueid)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  margin: 0px;
  background: rgba(0, 0, 0, 0.144);
  height: 200px;
  text-align: center;
}
@media (max-width: 576px) {
  main {
    height: unset;
    max-height: unset;
    margin-bottom: 0px!important;
    width: 100%;
  }
}

</style>
