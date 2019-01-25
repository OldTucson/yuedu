import Index from '../views/Index'
import Article from '../views/Article'
import Channel from '../views/Channel'
import Setting from '../views/Setting/Setting'
import Base from '../views/Setting/Base'
import Password from '../views/Setting/Password'
import Avatar from '../views/Setting/Avatar'
import User from '../views/User/User'
import Collected from '../views/User/Collected'
import Following from '../views/User/Following'
import Follower from '../views/User/Follower'
import Login from '../views/Login'
const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/article/2',
    children: [
      {
        path: 'article/:id',
        component: Article,
      }, {
        path: 'channel/:id',
        component: Channel
      }, {
        path: 'setting', 
        meta: {
          auth: true
        },
        component: Setting,
        redirect: 'setting/base',
        children: [
          {
            path: 'base',
            component: Base
          }, {
            path: 'avatar',
            component: Avatar
          }, {
            path: 'password',
            component: Password
          }
        ]
      }
    ]
  },
  {
    path: '/user/:id',
    component: User,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'collected',
        component: Collected,
        alias: '/user/:id'
      }, {
        path: 'following',
        component: Following
      }, {
        path: 'follower',
        component: Follower
      }
    ]
  }, {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      console.log(from.path)
      to.query.returnURL = from.path
      next()
    }
  }
]

export default routes