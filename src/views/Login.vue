<template>
  <div>
    <input type="text" v-model="user.email">
    <br>
    <input type="text" v-model="user.password">
    <br>
    <button @click="login">登录</button>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // localStorage.setItem('loged', true)
      // this.$router.push({
      //   path: this.$route.query.returnURL
      // })
      axios.post('/user/login',this.user).then(res => {
        if(res.data.res_code === 200) {
          // console.log(res.data.res.user)
          localStorage.setItem('token','Bearer ' + res.data.res.token)
          localStorage.setItem('userinfo',JSON.stringify(res.data.res.user))
          const returnURL = this.$route.query.returnURL
          this.$router.replace(returnURL)
        }
      })
    }
  }
}
</script>

<style>

</style>
