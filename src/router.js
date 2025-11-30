import { createRouter, createWebHistory } from 'vue-router'
import Words from './views/Words.vue'
import New from './views/New.vue'
import Edit from './views/Edit.vue'
import Show from './views/Show.vue'
import Test from './views/Test.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import PageNotFound from './components/PageNotFound.vue'
import { auth, onAuthStateChanged } from "./helpers/firebase"

const routes = [
  { 
    path: '/', 
    redirect: '/login', 
    meta: { hideHeader: true } 
  },

  { 
    path: '/login', 
    name: 'login', 
    component: Login,  
    meta: { hideHeader: true } 
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register, 
    meta: { hideHeader: true } 
  },

  // 🔒 Protected routes
  { 
    path: '/words', 
    name: 'words', 
    component: Words,
    meta: { requiresAuth: true }
  },
  { 
    path: '/words/new', 
    name: 'new-word', 
    component: New,
    meta: { requiresAuth: true }
  },
  { 
    path: '/words/:id', 
    name: 'show', 
    component: Show,
    meta: { requiresAuth: true }
  },
  { 
    path: '/words/:id/edit', 
    name: 'edit', 
    component: Edit,
    meta: { requiresAuth: true }
  },
  { 
    path: '/test', 
    name: 'Test', 
    component: Test,
    meta: { requiresAuth: true }
  },

  // 404
  { 
    path: "/:pathMatch(.*)*",
    name: 'not-found',
    component: PageNotFound 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


const getCurrentUser = () => new Promise(resolve => {
  const remove = onAuthStateChanged(auth, user => {
    remove()
    resolve(user)
  })
})

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser()
  if (to.meta.requiresAuth && !user) {
    return next('/login')
  }
  if ((to.name === 'login' || to.name === 'register') && user) {
    return next('/words')
  }
  next()
})

export default router
