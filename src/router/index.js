import Vue from 'vue'
import Router from 'vue-router' 
import routes from './routes'
Vue.use(Router)

// const routes = []

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          returnURL: to.path
        }
      })
    }
    
  } else {
    next()
  }
})


export default router