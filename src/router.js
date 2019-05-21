import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Current from './views/Current.vue'
import GroupOrder from './views/GroupOrder.vue'
import Schedule from './views/Schedule.vue'
import Vote from './views/Vote.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'current',
      component: Current
    },
    {
      path: '/group',
      name: 'group',
      component: GroupOrder
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule
    },
    {
      path: '/vote',
      name: 'vote',
      component: Vote
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
