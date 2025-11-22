import Vue from 'vue'
import Router from 'vue-router'
import Words from './views/Words.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'
import Show from './views/Show.vue'
import Test from './views/Test.vue'

const routes = [
  { path: '/', redirect: '/words' },
  { path: '/words', name: 'words', component: Words },
  { path: '/words/new', name: 'new-word', component: New },
  { path: '/words/:id', name: 'Show', component: Show },
  { path: '/words/:id/edit', name: 'edit', component: Edit },
  { path: '/test', name: 'Test', component: Test }
]

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})
