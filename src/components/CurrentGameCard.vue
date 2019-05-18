<template>
  <vs-card class="CurrentGameCard">
      <div slot="header" v-bind:class="{ 'con-vs-alert-warning con-vs-alert': title === '正在进行' }">
        <h4 class="titlex vs-alert--title">
          {{title}}{{gameStatus}}
        </h4>
      </div>
      <vs-row>
        <vs-col class="left" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12">
          {{data.redSide.player.team.collegeName}}<br>
          {{data.redSide.player.team.name}}<br>
          {{data.redSide.player.name}}
        </vs-col>
        <vs-col class="mid" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="2" vs-sm="12">
          {{score}}<br>
          {{matchRound}}<br>
          {{data.zone.name}}<br class="wrap-control">
          {{matchType}}<br>
          预计开始时间<br class="wrap-control">
          {{startTime[0]}}<br class="wrap-control">
          {{startTime[1]}}
        </vs-col>
        <vs-col class="right" vs-type="flex" vs-justify="center" vs-align="center" vs-lg="5" vs-sm="12">
          {{data.blueSide.player.team.collegeName}}<br>
          {{data.blueSide.player.team.name}}<br>
          {{data.blueSide.player.name}}
        </vs-col>
      </vs-row>
    </vs-card>
</template>

<script>
export default {
  props: ['title', 'data'],
  computed: {
    startTime () {
      return [
        this.$moment(this.data.planStartedAt).format('YYYY-MM-DD'),
        this.$moment(this.data.planStartedAt).format('HH:mm:ss')
      ]
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
          return ' - 候场中'

        case 'STARTED':
          return ' - 已开始'

        default:
          return ''
      }
    },
    score () {
      return this.data.redSideWinGameCount + ' / ' + this.data.blueSideWinGameCount
    },
    matchRound () {
      return 'BO' + this.data.planGameCount + (this.data.status.toUpperCase() === 'STARTED' ? ' SET' + (this.data.redSideWinGameCount + this.data.blueSideWinGameCount + 1) : '')
    }
  }
}
</script>
<style>
.CurrentGameCard .vs-card--header, .CurrentGameCard .vs-card--content {
  padding: 0px;
}

.CurrentGameCard .vs-card--content {
  font-size: 24px;
}

.CurrentGameCard .left {
  background-color: rgba(255, 71, 87, 0.15);
  border-bottom-left-radius: 8px;
  text-align: center;
}

.CurrentGameCard .mid {
  background-color: rgba(70, 201, 58, 0.15);
  text-align: center;
}

.CurrentGameCard .right {
  background-color: rgba(31, 116, 255, 0.15);
  border-bottom-right-radius: 8px;
  text-align: center;
}

@media only screen and (max-width: 900px) {
  .CurrentGameCard .left {
    border-bottom-left-radius: 0px;
  }

  .CurrentGameCard .right {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .CurrentGameCard .vs-card--content {
    font-size: 18px;
  }

  .wrap-control {
    display: none;
  }
}
</style>
