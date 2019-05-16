<template>
  <main>
    <b-alert show variant="danger" v-if="this.$parent.appMode.type !== 'live'">该模块对历史记录不适用</b-alert>
    <div v-else-if="this.$parent.djiData.cur_and_next !== null && this.$parent.appMode.type === 'live'">
      <b-alert show variant="danger" v-if="!this.$parent.djiData.cur_and_next.current_match">当前没有正在进行的比赛</b-alert>
      <b-container v-else>
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
