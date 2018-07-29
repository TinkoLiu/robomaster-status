<template>
  <main>
    <div v-if="tableVisible">
      <div v-for="item in tableData" :key="item.id">
        <b-table @row-clicked="trig($event.teamid)" striped hover :items="item.teams" :fields="[
        {
          key: item.name + '组',
          thStyle: 'width: 20%;font-size:12px;',
          sortable: false
        },
        {
          key: 'name',
          thStyle: 'width: 30%;font-size:12px;',
          label: '队名',
          sortable: false
        },
        {
          key: 'record',
          thStyle: 'width: 30%;font-size:12px;',
          label: '胜 / 平 / 负',
          sortable: false
        },
        {
          key: 'score',
          thStyle: 'width: 20%;font-size:12px;',
          label: '积分',
          sortable: false
        }
      ]"></b-table>
      </div>
    </div>
  </main>
</template>

<script>

export default {
  name: 'grouprank',
  data () {
    return {
      tableData: Object(),
      tableVisible: false,
      intervalID: null,
      djiData: this.$parent.djiData.groups_order
    }
  },
  methods: {
    process: function () {
      this.tableVisible = false
      this.tableData = Object()
      for (let index = 0; index < this.$parent.djiData.groups_order.groups.length; index++) {
        const element = this.$parent.djiData.groups_order.groups[index]
        var t = Object()
        t.name = element.name
        t.teams = []
        element.teams.forEach(el => {
          var v = Object()
          v.name = el.college_name + ' ' + el.name
          v.score = el.score
          v.record = el.record
          v.teamid = el.id
          v[element.name + '组'] = el.draw
          t.teams.push(v)
        })
        this.tableData[t.name] = t
      }
      this.tableVisible = true
    },
    trig: function (id) {
      this.$parent.$root.$children[0].updateModal(id)
    }
  },
  beforeMount: function () {
    this.$parent.$watch(
      'djiData.groups_order', () => {
        this.process()
      }, { deep: true }
    )
    if (this.$parent.djiData.groups_order !== null) {
      this.process()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  margin: 10px;
}
</style>
