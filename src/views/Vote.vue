<template>
  <div class="vote" v-if="chartOption">
    <span>官网投票走势图，每半小时更新一次</span><br>
    <span>仅统计票数最高的 7 支战队过去 6 小时数据</span><br>
    <v-chart :options="chartOption"/>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    chartOption () {
      return this.$store.state.djiData.vote.option
    }
  }
}
</script>

<style scoped>
  .echarts {
    width: 80%;
    height: 600px;
    margin: auto;
  }
  .vote {
    text-align: center;
  }
  .vote * {
    text-align: left;
  }
</style>
