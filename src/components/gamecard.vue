<template>
  <b-container :gameid="gamedata.id" :id="gamedata.status === 'process' ? 'process' : ''">
    <div class="outer">
      <div class="college" v-if="gamedata.teams[0]" @click="trig(gamedata.teams[0].id)">{{gamedata.teams[0].college_name}}</div>
      <div class="college" v-else>TBD</div>
      <div class="team" v-if="gamedata.teams[0]" @click="trig(gamedata.teams[0].id)">{{gamedata.teams[0].name}}</div>
      <div class="team" v-else>待定</div>
      <div class="gamestatus" @click="trigVS()" :class="gamedata.status" v-if="gamedata.status === 'closed'">已结束</div>
      <div class="gamestatus" @click="trigVS()" :class="gamedata.status" v-else-if="gamedata.status === 'scheduled'">已排期</div>
      <div class="gamestatus" @click="trigVS()" :class="gamedata.status" v-else-if="gamedata.status === 'pending'">结算中</div>
      <div class="gamestatus" @click="trigVS()" :class="gamedata.status" v-else-if="gamedata.status === 'process'">进行中</div>
      <div class="gamestatus" @click="trigVS()" :class="gamedata.status" v-else>{{gamedata.status}}</div>
      <div class="stage" @click="trigVS()" v-if="gamedata.stage=='group'">{{gamedata.group_name}}组 {{gamedata.players}}</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='1/8'">八分之一赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='13_16'">13-16排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='1/4'">四分之一赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='5_8'">5-8排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='1_8'">1-8排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='1_4'">1-4排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='9_12'">9-12排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='7_8'">7-8排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='5_6'">5-6排位赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='semifinal'">半决赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='third_place'">季军赛</div>
      <div class="stage" @click="trigVS()" v-else-if="gamedata.stage=='final'">决赛</div>
      <div class="score" :class="gamedata.teams[0] && gamedata.winner_team_id === gamedata.teams[0].id ? 'winner' : ''" @click="trig(gamedata.teams[0].id)">{{gamedata.score.split('/')[0]}}</div>
      <div class="score blue" :class="gamedata.teams[1] &&gamedata.winner_team_id === gamedata.teams[1].id ? 'winner' : ''" @click="trig(gamedata.teams[1].id)">{{gamedata.score.split('/')[1]}}</div>
      <div class="teamid" v-if="gamedata.teams[0]" @click="trig(gamedata.teams[0].id)">{{gamedata.teams[0].id}}</div>
      <div class="teamid" v-else>0</div>
      <div class="teamstatus" v-if="gamedata.teams[0]" @click="trig(gamedata.teams[0].id)">{{gamedata.first_team_checked_status}}</div>
      <div class="teamstatus" v-else>待定</div>
      <div class="expectedTime">预计开始时间<span class="autowrap"></span>{{getExpectedStart(gamedata.start_at)}}</div>
      <div class="teamstatus blue" v-if="gamedata.teams[1]" @click="trig(gamedata.teams[1].id)">{{gamedata.second_team_checked_status}}</div>
      <div class="teamstatus blue" v-else>待定</div>
      <div class="teamid blue" v-if="gamedata.teams[1]" @click="trig(gamedata.teams[1].id)">{{gamedata.teams[1].id}}</div>
      <div class="teamid blue" v-else>0</div>
      <div class="college blue" v-if="gamedata.teams[1]" @click="trig(gamedata.teams[1].id)">{{gamedata.teams[1].college_name}}</div>
      <div class="college blue" v-else>TBD</div>
      <div class="team blue" v-if="gamedata.teams[1]" @click="trig(gamedata.teams[1].id)">{{gamedata.teams[1].name}}</div>
      <div class="team blue" v-else>待定</div>
    <!-- {{gamedata}} -->
    </div>
  </b-container>
</template>

<script>
var moment = require('moment')
export default {
  name: 'gamecard',
  props: ['gamedata'],
  methods: {
    getExpectedStart: function (timestr) {
      return moment(timestr).format('YYYY-MM-DD HH:mm:ss')
    },
    trig: function (id) {
      this.$parent.$root.$children[0].updateModal(id)
    },
    trigVS: function () {
      this.$parent.$root.$children[0].updateTeamVSModal(this.gamedata.id, this.gamedata.teams[0].id, this.gamedata.teams[1].id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outer {
  word-wrap: break-word;
  margin-top: 15px;
  display: grid;
  grid-template-columns: min-content 1fr max-content max-content max-content 1fr min-content;
  grid-gap: 0px;
  grid-template-rows: 1fr 1fr 1fr;
  border-left: 6px solid rgb(240, 68, 68);
  border-right: 6px solid rgb(68, 206, 240);
  background: #e0e0e0;
}
.gamestatus {
  grid-column: 4;
  grid-row: 1;
  text-align: center;
  width: 100%;
  height: 100%;
}
.gamestatus.closed {
  color:#949494;
}
.gamestatus.process {
  background: #ffff00;
}
.college {
  grid-column: 1 / 3;
  background: #fcefee;
  grid-row: 1;
}
.college.blue {
  grid-column: 6 / 8;
  background: #e6faff;
}
.team {
  grid-column: 1 / 3;
  background: #fcefee;
  grid-row: 2;
}
.team.blue {
  grid-column: 6 / 8;
  background: #e6faff;
}
.teamid {
  grid-column: 1;
  grid-row: 3;
  margin: auto;
}
.teamid.blue {
  grid-column: 7;
}
.teamstatus {
  grid-column: 2;
  grid-row: 3;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
}
.teamstatus.blue {
  grid-column: 6;
  text-align: center;
}
.score {
  grid-column: 3;
  grid-row: 1 / 3;
  text-align: center;
  margin: auto;
  font-size: 30px;
  width: 100%;
  height: 100%;
}
.score.blue {
  grid-column: 5;
  text-align: center;
}
.score.winner {
  background: #4fffb6;
}
.stage {
  text-align: center;
  grid-column: 4;
  grid-row: 2;
}
.blue {
  text-align: right;
}
.expectedTime {
  grid-column: 3 / 6;
  text-align: center;
}
.autowrap:before {
  content: "：";
}
@media (max-width: 767px) {
  .outer {
    grid-template-columns: min-content 1fr minmax(10px, 20px) auto minmax(10px, 20px) 1fr min-content;
  grid-template-rows: min-content min-content min-content;
  }
  .teamid {
    display: none;
  }
  .score {
    grid-row: 2;
    font-size: unset;
  }
  .college {
    grid-column: 1 / 4;
  }
  .college.blue {
    grid-column: 5 / 8;
  }
  .expectedTime {
    margin: auto;
  }
  .autowrap:before {
    content: "\A";
    white-space: pre-line;
  }
}
</style>
