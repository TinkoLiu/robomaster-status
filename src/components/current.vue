<template>
  <main>
    <b-alert show variant="danger" v-if="this.$parent.appMode.type !== 'live'">该模块对历史记录不适用</b-alert>
    <div v-else-if="this.$parent.djiData.cur_and_next !== null && this.$parent.appMode.type === 'live'">
      <b-alert show variant="danger" v-if="!this.$parent.djiData.cur_and_next.current_match">当前没有正在进行的比赛</b-alert>
      <b-container v-else>
        <b-row>
          <b-col cols="5" sm="5" md="5" lg="5" xl="5"><b-progress :max="10000" show-value class="mb-0" style="height: 100%;"><b-progress-bar :value="parseInt(this.$parent.textLive.baseHP.red)" variant="danger"></b-progress-bar></b-progress></b-col>
          <b-col cols="2" sm="2" md="2" lg="2" xl="2" style="text-align: center;">{{this.$parent.textLive.battleClock}}</b-col>
          <b-col cols="5" sm="5" md="5" lg="5" xl="5"><b-progress :max="10000" show-value class="mb-0" style="direction: rtl; height: 100%;"><b-progress-bar :value="parseInt(this.$parent.textLive.baseHP.blue)"></b-progress-bar></b-progress></b-col>
          <b-col cols="3" sm="3" md="3" lg="3" xl="3" style="text-align: center; background: rgb(74, 74, 74); color: #ccc;"><span style="text-align: center; margin: auto; background: rgb(74, 74, 74); color: #ccc;">{{this.$parent.textLive.timestamp === 0 ? "等待更新" : this.$parent.textLive.timestamp.getHours() + ':' + this.$parent.textLive.timestamp.getMinutes() + ':' + this.$parent.textLive.timestamp.getSeconds() }}</span></b-col>
          <b-col cols="9" sm="9" md="9" lg="9" xl="9" style="background: rgb(210, 210, 210); word-wrap: break-word;">{{this.$parent.textLive.text}}</b-col>
        </b-row>
        <b-row id="current-row">
          <b-col class="indicator" cols="12">正在进行</b-col>
          <b-col sm="12" md="5">
            <schoolcard
              :stage="this.$parent.djiData.cur_and_next.current_match.stage"
              :teamid="this.$parent.djiData.cur_and_next.current_match.teams[0].id"
              :group_code="this.$parent.djiData.cur_and_next.current_match.players.split('/')[0]"
              :school="this.$parent.djiData.cur_and_next.current_match.teams[0].college_name"
              :schoolImg="this.$parent.djiData.cur_and_next.current_match.teams[0].college_logo"
              :teamImg="this.$parent.djiData.cur_and_next.current_match.teams[0].emblem"
              :team="this.$parent.djiData.cur_and_next.current_match.teams[0].name"
              :status="this.$parent.djiData.cur_and_next.current_match.first_team_checked_status">
            </schoolcard>
          </b-col>
          <b-col md="2" sm="12">
            <miniinfo
              :stage="this.$parent.djiData.cur_and_next.current_match.stage"
              :group="this.$parent.djiData.cur_and_next.current_match.group_name"
              :group_player="this.$parent.djiData.cur_and_next.current_match.players"
              :score="this.$parent.djiData.cur_and_next.current_match.score"
              :expected_start="this.$parent.djiData.cur_and_next.current_match.start_at"
              :redid="this.$parent.djiData.cur_and_next.current_match.teams[0].id"
              :blueid="this.$parent.djiData.cur_and_next.current_match.teams[1].id"
              :gameid="this.$parent.djiData.cur_and_next.current_match.id"
            ></miniinfo>
          </b-col>
          <b-col md="5" sm="12">
            <schoolcard
              :stage="this.$parent.djiData.cur_and_next.current_match.stage"
              :teamid="this.$parent.djiData.cur_and_next.current_match.teams[1].id"
              :group_code="this.$parent.djiData.cur_and_next.current_match.players.split('/')[1]"
              :school="this.$parent.djiData.cur_and_next.current_match.teams[1].college_name"
              :schoolImg="this.$parent.djiData.cur_and_next.current_match.teams[1].college_logo"
              :teamImg="this.$parent.djiData.cur_and_next.current_match.teams[1].emblem"
              :team="this.$parent.djiData.cur_and_next.current_match.teams[1].name"
              :status="this.$parent.djiData.cur_and_next.current_match.second_team_checked_status"
              :right="true">
            </schoolcard>
          </b-col>
        </b-row>
      </b-container>
      <b-alert show variant="danger" v-if="!this.$parent.djiData.cur_and_next.next_match">已经没有下一场比赛了</b-alert>
      <b-alert show variant="danger" v-else-if="this.$parent.djiData.cur_and_next.next_match.teams.length < 2">下一场次尚未完成战队安排</b-alert>
      <b-container v-else>
        <b-row>
          <b-col class="indicator" cols="12">下一场次</b-col>
          <b-col sm="12" md="5">
            <schoolcard
              :stage="this.$parent.djiData.cur_and_next.next_match.stage"
              :teamid="this.$parent.djiData.cur_and_next.next_match.teams[0].id"
              :group_code="this.$parent.djiData.cur_and_next.next_match.players.split('/')[0]"
              :school="this.$parent.djiData.cur_and_next.next_match.teams[0].college_name"
              :schoolImg="this.$parent.djiData.cur_and_next.next_match.teams[0].college_logo"
              :teamImg="this.$parent.djiData.cur_and_next.next_match.teams[0].emblem"
              :team="this.$parent.djiData.cur_and_next.next_match.teams[0].name"
              :status="this.$parent.djiData.cur_and_next.next_match.first_team_checked_status">
            </schoolcard>
          </b-col>
          <b-col sm="12" md="2">
            <miniinfo
              :stage="this.$parent.djiData.cur_and_next.next_match.stage"
              :group="this.$parent.djiData.cur_and_next.next_match.group_name"
              :group_player="this.$parent.djiData.cur_and_next.next_match.players"
              :score="this.$parent.djiData.cur_and_next.next_match.score"
              :expected_start="this.$parent.djiData.cur_and_next.next_match.start_at"
              :redid="this.$parent.djiData.cur_and_next.next_match.teams[0].id"
              :blueid="this.$parent.djiData.cur_and_next.next_match.teams[1].id"
              :gameid="this.$parent.djiData.cur_and_next.next_match.id"
            ></miniinfo>
          </b-col>
          <b-col sm="12" md="5">
            <schoolcard
              :stage="this.$parent.djiData.cur_and_next.next_match.stage"
              :teamid="this.$parent.djiData.cur_and_next.next_match.teams[1].id"
              :group_code="this.$parent.djiData.cur_and_next.next_match.players.split('/')[1]"
              :school="this.$parent.djiData.cur_and_next.next_match.teams[1].college_name"
              :schoolImg="this.$parent.djiData.cur_and_next.next_match.teams[1].college_logo"
              :teamImg="this.$parent.djiData.cur_and_next.next_match.teams[1].emblem"
              :team="this.$parent.djiData.cur_and_next.next_match.teams[1].name"
              :status="this.$parent.djiData.cur_and_next.next_match.second_team_checked_status"
              :right="true">
            </schoolcard>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </main>
</template>

<script>

import schoolcard from '@/components/schoolcard'
import miniinfo from '@/components/miniinfo'
export default {
  name: 'current',
  components: {
    'schoolcard': schoolcard,
    'miniinfo': miniinfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  margin: 10px;
}
.school-card > img {
  margin: 5px;
  width: 100px;
  height: 100px;
}
.row > div {
  padding: 0px;
}

#current-row .indicator {
  background: #effee4;
}

.indicator {
  background: #ffe4e7;
}
</style>
