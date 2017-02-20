import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Guide from 'components/Guide'
import Index from 'components/index'
import Home from 'components/home'
import Find from 'components/find'
import Photo from 'components/photo'
import Mine from 'components/mine'
import Exit from 'components/exit'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Guide',
      component: Guide
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/index/home',
          component: Home,
          alias: '/home'
        },
        {
          path: '/index/find',
          component: Find,
          alias: '/find'
        },
        {
          path: '/index/photos',
          component: Photo,
          alias: '/photos'
        },
        {
          path: '/index/mine',
          component: Mine,
          alias: '/mine'
        },
        {
          path: '/index/exit',
          component: Exit,
          alias: '/exit'
        }
      ]
    }
  ]
})
