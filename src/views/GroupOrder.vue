<template>
  <div v-if="this.$store.state.djiData.groups_order">
    <vs-table calss="groupsOrderTable" :key="el.id" v-for="el in this.$store.getters.groupsOrder" :data="el.players.nodes">
      <template slot="header">
        <h3>
          {{el.name}}组
        </h3>
      </template>
      <template slot="thead">
        <vs-th width="20px" style="padding-left:10px;padding-right:0px;">
          #
        </vs-th>
        <vs-th width="40px" style="padding-left:5px;padding-right:0px;">
          抽签
        </vs-th>
        <vs-th width="100px">
          队名
        </vs-th>
        <vs-th width="95px">
          胜 / 平 / 负
        </vs-th>
        <vs-th width="50px">
          积分
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td width="10px" :data="tr.rank">
            {{tr.rank}}
          </vs-td>

          <vs-td width="40px" :data="tr.name.split('-').join('')">
            {{tr.name.split('-').join('')}}
          </vs-td>

          <vs-td width="100px" :data="tr.team.collegeName + tr.team.name">
            {{tr.team.collegeName }}<br>{{ tr.team.name}}
          </vs-td>

          <vs-td :data="tr.winGroupMatchCount + '/' + tr.drawGroupMatchCount + '/' + tr.loseGroupMatchCount">
            {{tr.winGroupMatchCount + '/' + tr.drawGroupMatchCount + '/' + tr.loseGroupMatchCount}}
          </vs-td>

          <vs-td :data="tr.score">
            {{tr.score}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
  <div v-else>
    <vs-alert active="true" color="primary">Loading......</vs-alert>
  </div>
</template>

<script>

export default {
  name: 'group'
}
</script>
<style scoped>
</style>
<style>
  .td-check {
    display: none;
  }

  table.vs-table {
    min-width: unset;
  }
</style>
