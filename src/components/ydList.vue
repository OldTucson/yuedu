<template>
  <div class="articles-list">
    <div class="article" v-for="article in articles" :key="article.id">
      <router-link :to="'/article/' + article.id" class="article-left">
        <img :src="article.img_url" alt="">
      </router-link>
      <div class="article-body">
        <router-link :to="'/article/' + article.id" class="title">{{article.title}}</router-link>
        <p class="article-info">
          <span>{{article.author}}</span>
          <span>{{article.podcast}}</span>
          <span>{{article.duration}}</span>
          <span>{{article.play_time}}次</span>
        </p>
        <p class="article-content">
          {{article.content | sliceContent}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articles: Array
  },
  filters: {
    sliceContent (value) {
      return value.slice(0, 76) + '……'
    }
  }
}
</script>

<style>
  .articles-list {
    width: 620px;
  }
  .article {
    display: flex;
    margin-bottom: 30px;
    background: #fff;
  }
  .article-left {
    width: 210px;
    height: 210px;
    flex-shrink: 0;
    overflow: hidden;
  }
  .article-left img {
    height: 100%;
  }
  .article .article-body {
    padding: 30px;
  }
  .article .title {
    display: block;
    font-size: 18px;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 350px;
  }
  .article .article-info {
    font-size: 12px;
    color: #999;
    margin-bottom: 25px;
  }
  .article .article-info span {
    display: inline-block; 
    margin-right: 5px;
  }
  .article .article-content {
    font-size: 12px;
    line-height: 22px;
    color: rgb(112, 112, 112);
  }
</style>
