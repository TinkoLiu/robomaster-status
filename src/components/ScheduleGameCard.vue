<template>
  <div v-bind:class="wrapperClass">
    <div class="college">{{teamInfo.red.college}}</div>
    <div class="team">{{teamInfo.red.team}}</div>
    <div class="gameStatus">{{gameStatus}} / BO{{this.data.planGameCount}}</div>
    <div class="matchType">{{matchType}}</div>
    <div class="score">{{teamInfo.red.score}}</div>
    <div class="score blue">{{teamInfo.blue.score}}</div>
    <div class="teamstatus">{{teamInfo.red.status}}</div>
    <div class="startTime">预计开始时间<span class="autowrap"></span>{{startTime}}</div>
    <div class="teamstatus blue">{{teamInfo.blue.status}}</div>
    <div class="college blue">{{teamInfo.blue.college}}</div>
    <div class="team blue">{{teamInfo.blue.team}}</div>
    <br>
  </div>
</template>
<script>
export default {
  props: ['data'],
  methods: {
    prepareStatus (status) {
      switch (status) {
        case 'TO_GAME_FIELD':
          return '发往赛场'

        case 'ASSEMBLING_ING':
          return '正在检录'

        case 'ASSEMBLING_DONE':
          return '检录完成'

        default:
          return '未知状态'
      }
    }
  },
  computed: {
    teamInfo () {
      return {
        'red': {
          'college': (this.data.redSide.player ? this.data.redSide.player.team.collegeName : 'TBD'),
          'team': (this.data.redSide.player ? this.data.redSide.player.team.name : 'TBD'),
          'score': this.data.redSideWinGameCount,
          'status': this.prepareStatus(this.data.redSide.preparedStatus)
        },
        'blue': {
          'college': (this.data.blueSide.player ? this.data.blueSide.player.team.collegeName : 'TBD'),
          'team': (this.data.blueSide.player ? this.data.blueSide.player.team.name : 'TBD'),
          'score': this.data.blueSideWinGameCount,
          'status': this.prepareStatus(this.data.blueSide.preparedStatus)
        }
      }
    },
    startTime () {
      return this.$moment(this.data.planStartedAt).format('YYYY-MM-DD HH:mm')
    },
    wrapperClass () {
      let _t = 'wrapper'
      if (this.data.result) {
        switch (this.data.result.toUpperCase()) {
          case 'RED':
            _t += ' winner-red'
            break

          case 'BLUE':
            _t += ' winner-blue'
            break

          case 'TIE':
            _t += ' result-tie'
            break
        }
      }
      if (this.data.status.toUpperCase() === 'STARTED') {
        _t += ' started'
      }
      if (this.data.status.toUpperCase() === 'DONE') {
        _t += ' done'
      }
      return _t
    },
    matchType () {
      switch (this.data.matchType.toUpperCase()) {
        case 'GROUP':
          return '小组赛'

        case 'KNOCKOUT':
          switch (this.data.slug) {
            case '16_18':
              return '16进8分组赛'

            case '16_18_winer':
              return '16进8胜者组'

            case '16_18_loser_1':
              return '16进8败者组第一轮'

            case '16_18_loser_2':
              return '16进8败者组第二轮'

            case '8_4_winer':
              return '8进4胜者组'

            case '8_4_loser_1':
              return '8进4败者组第一轮'

            case '8_4_loser_2':
              return '8进4败者组第二轮'

            case 'revive':
              return '复活资格赛'

            case 'semi-final':
              return '半决赛'

            case 'bronze':
              return '季军赛'

            case 'final':
              return '冠军赛'

            default:
              break
          }
          return '淘汰赛'

        default:
          return ''
      }
    },
    gameStatus () {
      switch (this.data.status.toUpperCase()) {
        case 'WAITING':
          return '候场中'

        case 'STARTED':
          return '已开始'

        case 'DONE':
          return '已结束'

        case 'PENDING':
          return '结算中'

        default:
          return ''
      }
    },
    score () {
      return this.data.redSideWinGameCount + ' / ' + this.data.blueSideWinGameCount
    }
  }
}
</script>
<style scoped>
.wrapper {
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
.wrapper.done {
  background: #ececec;
  border-left: 6px solid #fcefee;
  border-right: 6px solid #e6faff;
}
.wrapper.winner-red{
  border-right: 6px solid #ececec;
}
.wrapper.winner-blue{
  border-left: 6px solid #ececec;
}
.gameStatus {
  grid-column: 4;
  grid-row: 1;
  text-align: center;
  width: 100%;
  height: 100%;
}
.wrapper.done .gameStatus {
  color:#949494;
}
.wrapper.started .gameStatus {
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
.wrapper.winner-red .college.blue{
  background: #ececec;
}
.wrapper.winner-blue .college:not(.blue){
  background: #ececec;
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
.wrapper.winner-red .team.blue{
  background: #ececec;
}
.wrapper.winner-blue .team:not(.blue){
  background: #ececec;
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
.wrapper.done .teamstatus {
  color: #fcefee;
  background: #fcefee;
}
.wrapper.done .teamstatus.blue {
  color: #e6faff;
  background: #e6faff;
}
.wrapper.winner-red .teamstatus.blue{
  color: #ececec;
  background: #ececec;
}
.wrapper.winner-blue .teamstatus:not(.blue){
  color: #ececec;
  background: #ececec;
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
.wrapper.winner-red .score:not(.blue) {
  background: #4fffb6;
}
.wrapper.winner-blue .score.blue {
  background: #4fffb6;
}
.matchType {
  text-align: center;
  grid-column: 4;
  grid-row: 2;
}
.blue {
  text-align: right;
}
.startTime {
  grid-column: 3 / 6;
  text-align: center;
}
.autowrap:before {
  content: "：";
}
@media only screen and (max-width: 700px) {
  .outer {
    grid-template-columns: min-content 1fr minmax(10px, 20px) auto minmax(10px, 20px) 1fr min-content;
    grid-template-rows: min-content min-content min-content;
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
  .startTime {
    margin: auto;
  }
  .autowrap:before {
    content: "\A";
    white-space: pre-line;
  }
}
</style>
