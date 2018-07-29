<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info" :sticky="true">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" exact>RoboMasters.dog</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/current">现场状态</b-nav-item>
          <b-nav-item to="/grouprank">小组积分</b-nav-item>
          <b-nav-item to="/allgames">所有场次</b-nav-item>
          <b-nav-item to="/about">关于</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-text>当前数据源：{{appMode.type === 'live' ? '现场实况' : appMode.type.split(',')[0] + appMode.text[appMode.type.split(',')[1]]}}</b-nav-text>
          <b-nav-item @click="datasourcemodalShow=true">选择数据源</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <router-view/>
      <b-modal v-model="detailmodalShow" id="teamDetail"
        v-if="detail.data"
        title="队伍详情"
      >
        <b-container>
          <b-row v-if="detail.data.in_final_teams || detail.data.in_covering_position_teams">
            <div>
              <b-badge variant="info" v-if="detail.data.in_covering_position_teams">进入复活赛</b-badge>
              <span v-if="detail.data.in_covering_position_teams">&nbsp;</span>
              <b-badge variant="success" v-if="detail.data.in_final_teams">晋级总决赛</b-badge>
            </div>
          </b-row>
          <b-row>
            <h4>{{detail.data.college_name}}</h4>
          </b-row>
          <b-row>
            <h6>{{detail.data.name}}</h6>
          </b-row>
          <b-row>
            <b-col>赛区：</b-col>
            <b-col v-if="detail.data.division_id == 20">南部</b-col>
            <b-col v-else-if="detail.data.division_id == 21">中部</b-col>
            <b-col v-else-if="detail.data.division_id == 19">北部</b-col>
            <b-col v-else-if="detail.data.division_id == 26">国际赛</b-col>
          </b-row>
          <b-row>
            <b-col>共计受到伤害：</b-col>
            <b-col>{{detail.data.total_damage}}</b-col>
          </b-row>
          <b-row>
            <b-col>小组抽签：</b-col>
            <b-col>{{detail.data.draw}}</b-col>
          </b-row>
          <b-row>
            <b-col>小组排名：</b-col>
            <b-col>{{detail.data.rank}}</b-col>
          </b-row>
          <b-row>
            <b-col>胜 / 平 / 负：</b-col>
            <b-col>{{detail.data.record}}</b-col>
          </b-row>
          <br>
          <span v-if="detail.data.in_final_teams || detail.data.in_covering_position_teams">
            <b-row><h6>高级数据：</h6></b-row>
            <b-row>
              <b-col>总评：</b-col>
              <b-col>{{detail.data.overall_star}}</b-col>
            </b-row>
            <b-row>
              <b-col>稳定性：</b-col>
              <b-col>{{detail.data.stability_score}}</b-col>
            </b-row>
            <b-row>
              <b-col>能量机关击打能力：</b-col>
              <b-col>{{detail.data.rune_score}}</b-col>
            </b-row>
            <b-row>
              <b-col>战术执行：</b-col>
              <b-col>{{detail.data.tactics_score}}</b-col>
            </b-row>
            <b-row>
              <b-col>救援能力：</b-col>
              <b-col>{{detail.data.rescue_score}}</b-col>
            </b-row>
            <b-row>
              <b-col>输出能力：</b-col>
              <b-col>{{detail.data.attack_score}}</b-col>
            </b-row>
            <b-row>
              <b-col>获取弹丸能力：</b-col>
              <b-col>{{detail.data.bullet_score}}</b-col>
            </b-row>
            <br>
            <b-row>
              <b-col>赛季胜率：</b-col>
              <b-col>{{detail.data.winning_rate}}</b-col>
            </b-row>
            <b-row>
              <b-col>基地净剩血量：</b-col>
              <b-col>{{detail.data.total_base_net_ph}}</b-col>
            </b-row>
            <b-row>
              <b-col>队伍总血量：</b-col>
              <b-col>{{detail.data.total_team_hp}}</b-col>
            </b-row>
            <br>
          </span>
          <b-row>
            <h6>比赛历史</h6>
          </b-row>
          <b-row>
            <span>施工中</span>
          </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">关闭</b-btn>
       </div>
      </b-modal>
      <b-modal id="datasource"
        v-model="datasourcemodalShow"
        title="选择数据源"
        :hide-footer="true"
      >
        <b-container>
          <b-row>
            <b-button class="w-100" variant="outline-success" @click="appMode.type='live';datasourcemodalShow=false">现场实况</b-button>
          </b-row>
          <br>
          <div style="text-align: center;">以下为可选历史数据</div>
          <b-row v-for="(val, key) in appMode.history" :key="key" class="datasource-btn-row">
            <b-button-group style="display: contents;">
              <b-button disabled>{{key}}</b-button>
              <b-button v-for="(v1, k1) in val" :key="k1" @click="appMode.type=key+','+v1;datasourcemodalShow=false">{{appMode.text[v1]}}</b-button>
            </b-button-group>
          </b-row>
        </b-container>
      </b-modal>
      <b-modal id="teamvs"
        v-model="teamvsmodalShow"
        title="对阵数据"
      >
        <b-container>
          <b-row v-if="showReplayLink">
            <b-col>回放可用</b-col>
            <b-col><a :href="skypixelShowData.link" target="_blank" rel="nofollow noreferrer noopener"><b-button class="w-100" size="sm" variant="outline-success">DJI - 天空之城</b-button></a></b-col>
          </b-row>
          <b-row v-if="showReplayLink">
            <b-col>时长：{{skypixelShowData.length}}</b-col>
          </b-row>
          <br v-if="showReplayLink && showTeamsChart">
          <chart :options="echartconfig" auto-resize v-if="showTeamsChart"></chart>
          <b-row v-if="showTeamsChart">
            <b-col><h5><center>组委会总评</center></h5></b-col>
          </b-row>
          <b-row v-if="showTeamsChart">
            <b-col>
              <b-progress :max="chartTeams[0].overall_star + chartTeams[1].overall_star">
                <b-progress-bar variant="danger" :value="chartTeams[0].overall_star" show-value></b-progress-bar>
                <b-progress-bar variant="primary" :value="chartTeams[1].overall_star" show-value></b-progress-bar>
              </b-progress>
            </b-col>
          </b-row>
          <b-row v-if="showTeamsChart">
            <b-col><h5><center>赛季总血量</center></h5></b-col>
          </b-row>
          <b-row v-if="showTeamsChart">
            <b-col>
              <b-progress :max="chartTeams[0].total_team_hp + chartTeams[1].total_team_hp">
                <b-progress-bar variant="danger" :value="chartTeams[0].total_team_hp" show-value></b-progress-bar>
                <b-progress-bar variant="primary" :value="chartTeams[1].total_team_hp" show-value></b-progress-bar>
              </b-progress>
            </b-col>
          </b-row>
          <b-row v-if="showTeamsChart">
            <b-col><h5><center>赛季总伤害</center></h5></b-col>
          </b-row>
          <b-row v-if="showTeamsChart">
            <b-col>
              <b-progress :max="chartTeams[0].total_damage + chartTeams[1].total_damage">
                <b-progress-bar variant="danger" :value="chartTeams[0].total_damage" show-value></b-progress-bar>
                <b-progress-bar variant="primary" :value="chartTeams[1].total_damage" show-value></b-progress-bar>
              </b-progress>
            </b-col>
          </b-row>
        </b-container>
        <div slot="modal-footer" class="w-100">
          <b-btn class="mt-3" variant="outline-danger" block @click="teamvsmodalShow=false">关闭</b-btn>
       </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import { Realtime, Event } from 'leancloud-realtime'
export default {
  name: 'App',
  data () {
    return {
      intervalID: null,
      djiData: {
        all: null,
        cur_and_next: null,
        groups_order: null
      },
      detail: {
        id: null,
        stage: null,
        data: null,
        history: null
      },
      textLive: {
        timestamp: 0,
        text: '',
        battleClock: '--:--',
        baseHP: {
          blue: 0,
          red: 0
        }
      },
      chartTeams: [
        {
          'attack_score': 0,
          'box_num': 0,
          'bullet_score': 0,
          'college_name': '',
          'id': 0,
          'in_covering_position_teams': false,
          'in_final_teams': false,
          'name': '',
          'overall_star': 0,
          'rescue_score': 0,
          'rune_score': 0,
          'stability_score': 0,
          'tactics_score': 0,
          'total_base_net_ph': 0,
          'total_damage': 0,
          'total_team_hp': 0,
          'winning_rate': '0%'
        },
        {
          'attack_score': 0,
          'box_num': 0,
          'bullet_score': 0,
          'college_name': '',
          'id': 0,
          'in_covering_position_teams': false,
          'in_final_teams': false,
          'name': '',
          'overall_star': 0,
          'rescue_score': 0,
          'rune_score': 0,
          'stability_score': 0,
          'tactics_score': 0,
          'total_base_net_ph': 0,
          'total_damage': 0,
          'total_team_hp': 0,
          'winning_rate': '0%'
        }
      ],
      teamAdvancedData: [],
      skypixelData: {},
      skypixelShowData: {},
      showTeamsChart: false,
      showReplayLink: false,
      echartconfig: {
        title: {
          show: 'false'
        },
        tooltip: {
          position: ['0%', '0%'],
          formatter: function (params) {
            return params.name + '<br>' +
            '输出能力：' + params.value[0] + '<br>' +
            '获取弹丸能力：' + params.value[1] + '<br>' +
            '能量机关击打能力：' + params.value[2] + '<br>' +
            '稳定性：' + params.value[3] + '<br>' +
            '战术执行：' + params.value[4] + '<br>' +
            '救援能力：' + params.value[5]
          }
        },
        legend: {
          data: []
        },
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              borderRadius: 3,
              backgroundColor: '#555',
              padding: [3, 3]
            }
          },
          indicator: [
            { name: '输出能力', max: 10 },
            { name: '获取弹\n丸能力', max: 10 },
            { name: '能量机关\n击打能力', max: 10 },
            { name: '稳定性', max: 10 },
            { name: '战术执行', max: 10 },
            { name: '救援能力', max: 10 }
          ],
          radius: '60%',
          center: ['50%', '170px']
        },
        series: []
      },
      allTeams: Object(),
      detailmodalShow: false,
      datasourcemodalShow: false,
      teamvsmodalShow: false,
      appMode: {
        type: 'live',
        history: {
          2018: [
            'south',
            'mid',
            'north',
            'intl-wildcard',
            'repechage',
            'final'
          ]
        },
        text: {
          'south': '南部',
          'mid': '中部',
          'north': '北部',
          'east': '东部',
          'west': '西部',
          'repechage': '复活赛',
          'intl-wildcard': '国际踢馆赛',
          'final': '总决赛'
        }
      },
      leancloud: {
        realtime: {},
        conversation: {},
        client: {}
      }
    }
  },
  methods: {
    getAllGames: function () {
      axios.get('https://bird.ioliu.cn/v1?url=https://robomaster.com/api/games')
        .then(response => (
          this.djiData.all = response.data
        ))
    },
    getCurGames: function () {
      axios.get('https://bird.ioliu.cn/v1?url=https://robomaster.com/api/games/current_and_next_matches')
        .then(response => (
          this.djiData.cur_and_next = response.data
        ))
    },
    getGroupScore: function () {
      axios.get('https://bird.ioliu.cn/v1?url=https://robomaster.com/api/games/groups_order')
        .then(response => {
          this.djiData.groups_order = response.data
          this.processTeams()
        })
    },
    updateAPI: function () {
      if (this.appMode.type === 'live') {
        this.getAllGames()
        this.getCurGames()
        this.getGroupScore()
      }
    },
    showModal: function () {
      this.detailmodalShow = true
    },
    hideModal: function () {
      this.detailmodalShow = false
    },
    updateModal: function (teamid) {
      this.detail.id = teamid
      // this.detail.stage = stage
      this.detail.data = this.allTeams[this.detail.id]
      if (this.teamAdvancedData[this.detail.id]['in_covering_position_teams'] || this.teamAdvancedData[this.detail.id]['in_final_teams']) {
        this.detail.data['in_covering_position_teams'] = this.teamAdvancedData[this.detail.id]['in_covering_position_teams']
        this.detail.data['in_final_teams'] = this.teamAdvancedData[this.detail.id]['in_final_teams']
        this.detail.data['attack_score'] = this.teamAdvancedData[this.detail.id]['attack_score']
        this.detail.data['bullet_score'] = this.teamAdvancedData[this.detail.id]['bullet_score']
        this.detail.data['overall_star'] = this.teamAdvancedData[this.detail.id]['overall_star']
        this.detail.data['rescue_score'] = this.teamAdvancedData[this.detail.id]['rescue_score']
        this.detail.data['rune_score'] = this.teamAdvancedData[this.detail.id]['rune_score']
        this.detail.data['stability_score'] = this.teamAdvancedData[this.detail.id]['stability_score']
        this.detail.data['tactics_score'] = this.teamAdvancedData[this.detail.id]['tactics_score']
        this.detail.data['winning_rate'] = this.teamAdvancedData[this.detail.id]['winning_rate']
      }

      // this.processDetail()
      this.showModal()
    },
    updateTeamVSModal: function (gameid, redid, blueid) {
      this.chartTeams = [
        {
          'attack_score': 0,
          'box_num': 0,
          'bullet_score': 0,
          'college_name': '',
          'id': 0,
          'in_covering_position_teams': false,
          'in_final_teams': false,
          'name': '',
          'overall_star': 0,
          'rescue_score': 0,
          'rune_score': 0,
          'stability_score': 0,
          'tactics_score': 0,
          'total_base_net_ph': 0,
          'total_damage': 0,
          'total_team_hp': 0,
          'winning_rate': '0%'
        },
        {
          'attack_score': 0,
          'box_num': 0,
          'bullet_score': 0,
          'college_name': '',
          'id': 0,
          'in_covering_position_teams': false,
          'in_final_teams': false,
          'name': '',
          'overall_star': 0,
          'rescue_score': 0,
          'rune_score': 0,
          'stability_score': 0,
          'tactics_score': 0,
          'total_base_net_ph': 0,
          'total_damage': 0,
          'total_team_hp': 0,
          'winning_rate': '0%'
        }
      ]
      this.skypixelShowData = {}
      this.showTeamsChart = false
      this.showReplayLink = false
      if (this.skypixelData[gameid]) {
        this.skypixelShowData = this.skypixelData[gameid]
        this.showReplayLink = true
      }
      if ((this.teamAdvancedData[redid]['in_covering_position_teams'] || this.teamAdvancedData[redid]['in_final_teams']) && (this.teamAdvancedData[blueid]['in_covering_position_teams'] || this.teamAdvancedData[blueid]['in_final_teams'])) {
        this.chartTeams[0] = this.teamAdvancedData[redid]
        this.chartTeams[1] = this.teamAdvancedData[blueid]
        this.chartTeams[0]['total_damage'] = this.allTeams[redid]['total_damage']
        this.chartTeams[1]['total_damage'] = this.allTeams[blueid]['total_damage']
        this.chartTeams[0]['total_team_hp'] = this.allTeams[redid]['total_team_hp']
        this.chartTeams[1]['total_team_hp'] = this.allTeams[blueid]['total_team_hp']
        this.chartTeams[0]['total_base_net_ph'] = this.allTeams[redid]['total_base_net_ph']
        this.chartTeams[1]['total_base_net_ph'] = this.allTeams[blueid]['total_base_net_ph']
        this.echartconfig.legend.data = [this.chartTeams[0].college_name + ' - ' + this.chartTeams[0].name, '', this.chartTeams[1].college_name + ' - ' + this.chartTeams[1].name]
        this.echartconfig.series = [{
          name: this.chartTeams[0].college_name + ' - ' + this.chartTeams[0].name + ' VS ' + this.chartTeams[1].college_name + ' - ' + this.chartTeams[1].name,
          type: 'radar',
          data: [
            {
              value: [
                this.chartTeams[0].attack_score,
                this.chartTeams[0].bullet_score,
                this.chartTeams[0].rune_score,
                this.chartTeams[0].stability_score,
                this.chartTeams[0].tactics_score,
                this.chartTeams[0].rescue_score
              ],
              name: this.chartTeams[0].college_name + ' - ' + this.chartTeams[0].name,
              itemStyle: {
                normal: {
                  color: 'rgb(255, 0, 0)'
                }
              }
            },
            {
              value: [
                this.chartTeams[1].attack_score,
                this.chartTeams[1].bullet_score,
                this.chartTeams[1].rune_score,
                this.chartTeams[1].stability_score,
                this.chartTeams[1].tactics_score,
                this.chartTeams[1].rescue_score
              ],
              name: this.chartTeams[1].college_name + ' - ' + this.chartTeams[1].name,
              itemStyle: {
                normal: {
                  color: 'rgb(0, 0, 255)'
                }
              }
            }
          ]
        }]
        this.showTeamsChart = true
      }
      if (this.showTeamsChart || this.showReplayLink) {
        this.teamvsmodalShow = true
      }
    },
    processDetail: function () {
      switch (this.detail.stage) {
        case 'group':
          var t = Object()
          t.group = this.detail.id.split('')[0]
          for (let index = 0; index < this.djiData.groups_order.groups[t.group.toUpperCase().charCodeAt() - 'A'.charCodeAt()].teams.length; index++) {
            const element = this.djiData.groups_order.groups[t.group.toUpperCase().charCodeAt() - 'A'.charCodeAt()].teams[index]
            if (element.draw !== this.detail.id) {
              continue
            }
            this.detail.data = element
          }
          this.showModal()
          break
        case 'id':
          this.detail.data = this.allTeams[this.detail.id]
          this.showModal()
          break
        default:
          break
      }
    },
    processTeams: function () {
      this.djiData.groups_order.groups.forEach(element => {
        element.teams.forEach(el => {
          this.allTeams[el.id] = el
        })
      })
    },
    getTeamsDetail: function () {
      axios.get('/chartdata.json?ver=201807252320')
        .then(response => (
          this.teamAdvancedData = response.data
        ))
    },
    getReplayData: function () {
      axios.get('/skypixel.json?ver=201807282248')
        .then(response => (
          this.skypixelData = response.data
        ))
    },
    resetTextLive: function () {
      this.textLive = {
        timestamp: 0,
        text: '',
        battleClock: '--:--',
        baseHP: {
          blue: 0,
          red: 0
        }
      }
    },
    connectTextLive: function () {
      // ID, key and channel id were found in official website
      this.leancloud.realtime = new Realtime({
        appId: '2Jq7vt0Dowjtfcdyq12yQYrD-gzGzoHsz',
        appKey: '5b306ea9ffd1eb4d5647336e'
      })
      this.leancloud.realtime.createIMClient('serviceClient').then((serviceClient) => {
        this.leancloud.client = serviceClient
        serviceClient.on(Event.MESSAGE, (msg) => {
          this.processTextLiveMsg(msg)
        })
        serviceClient.getConversation('5b4ec59d17d009003a5381f3').then((conversation) => {
          this.leancloud.conversation = conversation
          conversation.join()
        })
      }).catch(function (e) {
        console.log('创建赛况leanCloud连接失败: ' + e)
      })
    },
    processTextLiveMsg: function (msg) {
      if (msg.content.type === 1) {
        console.log(msg)
        this.textLive.timestamp = msg.timestamp
        this.textLive.text = msg.content.txt
        this.textLive.battleClock = msg.content.title.match(/[0-5]\d:[0-5]\d/g).toString()
        var regexp = new RegExp('\\[(\\d*)-(\\d*)\\]')
        var t = regexp.exec(msg.content.title)
        this.textLive.baseHP.red = t[1]
        this.textLive.baseHP.blue = t[2]
      } else if (msg.content.type === 3) {
        this.resetTextLive()
      }
    }
  },
  mounted: function () {
    this.getTeamsDetail()
    this.getReplayData()
    this.updateAPI()
    // this.connectTextLive()
    // this.intervalID = setInterval(() => {
    //   this.updateAPI()
    // }, 1000 * 30)
    this.appMode.type = '2018,final'
  },
  watch: {
    appMode: {
      handler: function (newVal, oldVal) {
        this.djiData.cur_and_next = null
        this.djiData.all = null
        this.djiData.groups_order = null
        if (newVal.type === 'live') {
          this.updateAPI()
        } else {
          var t = Object()
          t.year = newVal.type.split(',')[0]
          t.game = newVal.type.split(',')[1]
          axios.get('/history/' + t.year + '/' + t.game + '/' + 'groups_order.json')
            .then(response => {
              this.djiData.groups_order = response.data
              this.processTeams()
            })
          axios.get('/history/' + t.year + '/' + t.game + '/' + 'all.json')
            .then(response => (
              this.djiData.all = response.data
            ))
        }
      },
      deep: true
    }
  }
}
</script>

<style>
.datasource-btn-row {
  margin-top: 10px;
}
#teamvs .echarts {
  width: 100%;
  height: 300px;
  margin: 0 auto;
}
</style>
