import Vue from 'vue'
import Router from 'vue-router'
<% if (VueAutoRoutes) { -%>
import { routes } from 'vue-auto-routes'
<% } -%>

Vue.use(Router)

export function createRouter() {
  const router = new Router({
<% if (VueAutoRoutes) { -%>
    routes,
<% } else { -%>
    routes: [
      {
        path: '/',
        component: () => import('@/views/index.vue')
      },
      {
        path: '/bar',
        component: () => import('@/views/bar.vue')
      }
    ]
<% } -%>
  })

  return router
}
