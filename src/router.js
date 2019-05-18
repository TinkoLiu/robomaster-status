import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Current from './views/Current.vue'
import GroupOrder from './views/GroupOrder.vue'
import Schedule from './views/Schedule.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
