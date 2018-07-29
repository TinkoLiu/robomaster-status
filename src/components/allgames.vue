<template>
  <main>
    <b-container>
      <div v-if="this.$parent.djiData.all !== null">
        <b-row>
          <b-container>
            <b-form-checkbox id="checkbox1" v-model="showFinished">
              显示已完成场次
            </b-form-checkbox>
          </b-container>
        </b-row>
        <b-row v-for="(item, key) in this.$parent.djiData.all.matches" :key="key">
          <gamecard :gamedata="item" v-show="item.status !== 'closed' || showFinished"></gamecard>
        </b-row>
      </div>
    </b-container>
  </main>
</template>

<script>
import gamecard from '@/components/gamecard'
export default {
  name: 'allgames',
  components: {
    gamecard
  },
  data () {
    return {
      showFinished: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  margin-bottom: 10px;
}
</style>
