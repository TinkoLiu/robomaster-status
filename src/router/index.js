import Vue from 'vue'
import Router from 'vue-router'
import current from '@/components/current'
import allgames from '@/components/allgames'
import landing from '@/components/landing'
import grouprank from '@/components/grouprank'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/current',
      name: 'current',
      component: current
    },
    {
      path: '/allgames',
      name: 'allgames',
      component: allgames
    },
    {
      path: '/grouprank',
      name: 'grouprank',
      component: grouprank
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/',
      name: 'landing',
      component: landing
    }
  ]
})
