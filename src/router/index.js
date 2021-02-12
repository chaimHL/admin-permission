import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import store from '@/store/index.js'

Vue.use(VueRouter)

// 定义路由规则
const usersRule = { path: 'users', component: () => import('@/views/users.vue') }
const goodsRule = { path: 'goods', component: () => import('@/views/goods.vue') }
const categoriesRule = { path: 'categories', component: () => import('@/views/categories.vue') }

const ruleMapping = {
  'users': usersRule,
  'goods': goodsRule,
  'categories': categoriesRule
}

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/Welcome.vue')
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 放行
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export function initDynamicRoutes() {
  // 对路由规则进行动态的添加
  const curRoutes = router.options.routes
  store.state.leftList.forEach(item => {
    item.children.forEach(item => {
      const temp = ruleMapping[item.path]
      // 给路由规则添加meta元数据，存放相应路由下所拥有的权限数组数据
      temp.meta = item.rights
      curRoutes[2].children.push(temp)
    })
  })
  router.addRoutes(curRoutes)
}

export default router
