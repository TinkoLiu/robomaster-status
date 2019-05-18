<template>
  <div v-if="this.$store.state.djiData.current_and_next">
    <div class="matchDetail currentMatch">
      <vs-alert active="true" color="danger" v-if="!this.$store.state.djiData.current_and_next.currentMatch">当前没有进行中的比赛</vs-alert>
      <CurrentGameCard title="正在进行" v-else :data="this.$store.state.djiData.current_and_next.currentMatch" />
    </div>
    <div class="matchDetail nextMatch">
      <vs-alert active="true" color="danger" v-if="!this.$store.state.djiData.current_and_next.nextMatch">当前没有下一场次安排</vs-alert>
      <CurrentGameCard title="下一场次" v-else :data="this.$store.state.djiData.current_and_next.nextMatch" />
    </div>
  </div>
  <div v-else>
    <vs-alert active="true" color="primary">Loading......</vs-alert>
  </div>
</template>

<script>
import CurrentGameCard from '@/components/CurrentGameCard.vue'

export default {
  name: 'current',
  components: {
    'CurrentGameCard': CurrentGameCard
  }
}
</script>

<style scoped>
.matchDetail {
  margin-bottom: 20px;
}
</style>
