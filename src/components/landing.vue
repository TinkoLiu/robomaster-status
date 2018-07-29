<template>
  <main>
    <div id="center"><h1>RoboMasters.dog<br>机甲大师.top<br>2018赛季赛程追踪</h1></div>
    <!-- <div v-if="this.dur.final.asSeconds() + this.divisiontime.final[1] > 0" id="footer">
      <span v-if="this.dur.mid.asSeconds() > 0">中部：{{Math.floor(dur.mid.asDays())}}天{{dur.mid.hours()}}小时{{dur.mid.minutes()}}分{{dur.mid.seconds()}}秒<br></span>
      <span v-else-if="this.dur.mid.asSeconds() + this.divisiontime.mid[1] > 0" style="color:red;">中部进行中<br></span>
      <span v-if="this.dur.north.asSeconds() > 0">北部：{{Math.floor(dur.north.asDays())}}天{{dur.north.hours()}}小时{{dur.north.minutes()}}分{{dur.north.seconds()}}秒</span>
      <span v-else-if="this.dur.north.asSeconds() + this.divisiontime.north[1] > 0" style="color:red;">北部进行中<br></span>
      <span v-if="this.dur.repechage.asSeconds() > 0">复活赛倒计时：{{Math.floor(dur.repechage.asDays())}}天{{dur.repechage.hours()}}小时{{dur.repechage.minutes()}}分{{dur.repechage.seconds()}}秒<br></span>
      <span v-else-if="this.dur.repechage.asSeconds() + this.divisiontime.repechage[1] > 0" style="color:red;">复活赛进行中<br></span>
      <span v-if="this.dur.final.asSeconds() > 0">总决赛倒计时：{{Math.floor(dur.final.asDays())}}天{{dur.final.hours()}}小时{{dur.final.minutes()}}分{{dur.final.seconds()}}秒</span>
      <span v-else-if="this.dur.final.asSeconds() + this.divisiontime.final[1] > 0" style="color:red;">总决赛进行中<br></span>
    </div> -->
    <div id="footer">
      <span>恭喜华南虎卫冕成功<br></span>
    </div>
  </main>
</template>

<script>
var moment = require('moment')
export default {
  name: 'langing',
  data () {
    return {
      divisiontime: {
        mid: [1526486400, 259200],
        north: [1527091200, 259200],
        final: [1532448000, 432000],
        repechage: [1532188800, 172800]
      },
      dur: {
        mid: 0,
        north: 0,
        final: 0,
        repechage: 0
      },
      intervalID: null
    }
  },
  methods: {
    update: function () {
      this.dur.mid = moment.duration((this.divisiontime.mid[0].valueOf() * 1000 - moment().valueOf()) / 1000 + 1, 's')
      this.dur.north = moment.duration((this.divisiontime.north[0].valueOf() * 1000 - moment().valueOf()) / 1000 + 1, 's')
      this.dur.final = moment.duration((this.divisiontime.final[0].valueOf() * 1000 - moment().valueOf()) / 1000 + 1, 's')
      this.dur.repechage = moment.duration((this.divisiontime.repechage[0].valueOf() * 1000 - moment().valueOf()) / 1000 + 1, 's')
    }
  },
  beforeMount: function () {
    this.update()
    if (!this.intervalID) {
      this.intervalID = setInterval(() => {
        this.update()
      }, 300)
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalID)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  position: fixed;
  bottom: 0px;
  text-align: center;
  left: 0px;
  right: 0px;
}

div#center {
  position: fixed;
  left: 0px;
  right: 0px;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}
</style>
