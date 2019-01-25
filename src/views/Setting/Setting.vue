<template>
  <div>
    <h3>设置个人信息</h3>
    <nav>
      <router-link to="/setting/base">基本信息</router-link>
      <router-link to="/setting/avatar">头像</router-link>
      <router-link to="/setting/password">密码</router-link>

    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
