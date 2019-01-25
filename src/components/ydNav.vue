<template>
  <div class="container">
    <nav>
      <router-link to="/" ><span class="logo">悦读FM</span></router-link>
      <router-link 
        active-class="active"
        :to="'/channel/' + type.id" 
        v-for="type in types" 
        :key="type.id"
      >
        {{type.type}}
      </router-link>
      <router-link to="/login" class="login-btn" v-show="!cur">登录 | 注册</router-link>
      <a href="javascript:;" v-show="cur" class="logout" @click="logout">退出</a>
      <router-link :to="'/user/' + userinfo.id" class="user-info" v-show="cur">{{ userinfo.nikiname }},欢迎</router-link>
      
    </nav>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  data () {
    return {
      types: [],
      cur:''
    }
  },
  created () {
    axios.get('/types').then(res => {
      // console.log(res.data)
      this.types = res.data.res
    })
    this.cur = localStorage.getItem('token')
  },
  methods:{
    logout (){
      this.cur = ''
      localStorage.removeItem('userinfo')
      localStorage.removeItem('token')
    }
  },
  computed:{
    userinfo (){
      return JSON.parse(localStorage.getItem('userinfo')) || ''
    }
  }
}
</script>

<style>
  .container {
    background: #fff;
    margin-bottom: 40px;
    font-size: 14px;
  }
  nav {
    width: 1010px;
    margin: 0 auto;
    height: 106px;
    line-height: 106px;
  }

  nav a {
    display: inline-block;
    padding: 0 20px;
  }
  nav .logo{
    border-left: 3px solid #ee5044;
    padding-left: 10px;
  }
  nav .login-btn{
    /* margin-left: 350px; */
    float: right;
    font-size: 12px;
  }
  nav .user-info{
    /* margin-left: 350px; */
    float: right;
    display: inline;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
  }
  nav .logout{
    float: right;
    font-size: 12px;
    padding: 0;
  }
  .active {
    color: #ee5044;
    
  }
</style>
