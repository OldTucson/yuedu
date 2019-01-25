<template>
    <div class="banner">
    <div class="banner-header">
      <h3 class="other">其他相关节目</h3>
      <div class="control">
        <i class="prev" @click="prev" v-if="active > 0">&lt;</i>
        <i class="prev disabled" v-else>&lt;</i>

        <i class="next" @click="next" v-if="active < articles.length - 1">&gt;</i>
        <i class="next disabled" v-else>&gt;</i>
      </div>
    </div>

    <transition-group tag="ul" name="banner">
      <li v-for="(articleItems, index) in articles" :key="articleItems[0].id" v-show="active === index">
        <div class="article-item" v-for="(article, index) in articleItems" :key="index">
          <img :src="article.img_url" width="100%" alt="">
          <router-link :to="'/article/' + article.id" class="banner-title">{{article.title}}</router-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
    data () {
        return {
            active:0
        }
    },
    methods:{
        next () {
            this.active++
        },
        prev () {
            this.active--
        }
    },
    props: {
        articles:Array
    }
}
</script>

<style>
    .banner{
      width: 360px;
      position: absolute;
      right: -390px;
      top: 263px;
      background: #fff;
      color: #333;
      font-size: 12px;
    }
    .banner .banner-header{
        display: flex;
        padding: 20px;
        padding-bottom: 0;
        justify-content: space-between;
        align-items: center;
    }
    .banner .banner-header .other{
        border-left: 3px solid #ee5044;
        padding-left: 10px;
    }
    .banner .banner-header i{
        font-style: normal;
        font-weight: bolder;
        font-size: 14px;
    }
    .banner .banner-header i.disabled{
        color: rgb(180,180,180);
    }
    .banner>ul{
        list-style: none;
        width: 100%;
        height: 290px;
        position: relative;
        padding: 0;
        
    }
    .banner>ul>li{
        list-style: none;
        position: absolute;
        width: 320;
        padding: 20px;
        padding-top: 0;
        display: flex;
        justify-content: space-between;
        
        flex-flow: row wrap;
    }
    .banner>ul>li .article-item{
        width: 150px;
        margin-top: 10px;
    }
    .banner>ul>li .article-item img{
        height: 100px;
    }
    .banner>ul>li .article-item .banner-title{
        display: block;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .banner-enter, .banner-leave-to {
      opacity: 0;
    }
    .banner-enter-to, .banner-leave {
      opacity: 1;
    }
    .banner-enter-active, .banner-leave-active {
      transition: opacity 1.5s;
    }
</style>
