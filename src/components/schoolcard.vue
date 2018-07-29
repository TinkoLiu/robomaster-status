<template>
  <main @click="trig(teamid)" v-bind:class="{ right : right }">
    <b-row>
      <b-col cols="4" class="imgarea">
        <img :src="schoolImg">
        <img :src="teamImg">
      </b-col>
      <b-col class="infoarea">
        <h3>{{school}}</h3>
        <h5>{{team}}</h5>
        <span>{{status}}</span>
      </b-col>
    </b-row>
  </main>
</template>

<script>

export default {
  name: 'schoolcard',
  props: [
    'schoolImg',
    'teamImg',
    'school',
    'team',
    'status',
    'winrate',
    'right',
    'teamid',
    'stage',
    'group_code'
  ],
  methods: {
    trig: function (id) {
      this.$parent.$root.$children[0].updateModal(id)
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  height: 200px;
  max-height: 200px;
  border-left: 6px solid rgb(240, 68, 68);
  background: #fcefee;
  margin: 0px;
  margin-bottom: 8px;
}
main.right {
  direction: rtl;
  border-left: 0!important;
  border-right: 6px solid rgb(68, 206, 240);
  background: #e6faff;
}
main.right .infoarea {
  direction: ltr;
}
.imgarea {
  display: flex;
  flex-direction: column;
}
.infoarea *:last-child {
  position: absolute;
  bottom: 0px;
}
.infoarea {
  display: flex;
  flex-direction: column;
  margin: 3px;
}
.imgarea img {
  height: 100px;
  width: 100px;
}
@media (max-width: 576px) {
  .imgarea {
    display: none;
  }
  .infoarea *:last-child {
    position: relative;
  }
}
@media (max-width: 767px) {
  main {
    height: unset;
    max-height: unset;
    margin-bottom: 0px!important;
  }
}
</style>
