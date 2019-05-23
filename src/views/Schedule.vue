<template>
  <div v-if="schedule">
    <vs-collapse>
      <vs-collapse-item :open="true">
        <div slot="header">
         小组赛
        </div>
        <ScheduleGameCard v-for="el in schedule.groupMatches.nodes" v-bind:key="el.id" :data="el"></ScheduleGameCard>
        <!-- TODO: GROUP MATCH -->
      </vs-collapse-item>
      <vs-collapse-item :open="true">
        <div slot="header">
         淘汰赛
        </div>
        <ScheduleGameCard v-for="el in schedule.knockoutMatches.nodes" v-bind:key="el.id" :data="el"></ScheduleGameCard>
        <!-- TODO: KNOCK OUT MATCH -->
      </vs-collapse-item>
    </vs-collapse>
    <span id="goCurrent" @click="goCurrent"><i class="material-icons">play_arrow</i></span>
  </div>
</template>

<script>
import ScheduleGameCard from '@/components/ScheduleGameCard.vue'

export default {
  name: 'schedule',
  components: {
    ScheduleGameCard
  },
  computed: {
    schedule () {
      return this.$store.getters.schedule
    }
  },
  methods: {
    goCurrent () {
      if (document.querySelector('.started')) {
        this.$scrollTo('.started')
      } else {
        let _t = document.querySelectorAll('.done')
        this.$scrollTo(_t[_t.length - 1])
      }
    }
  }
}
</script>
<style scoped>
#goCurrent {
  position: fixed;
  bottom: 0px;
  right: 3px;
  zoom: 2;
  opacity: 0.8;
  user-select: none;
}
#goCurrent i{
  background: #fff;
}
.vs-collapse {
  max-width: 700px;
  margin: auto;
}
</style>
