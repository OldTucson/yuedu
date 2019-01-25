<template>
  <div class="channel-top10">
    <ul>
      <li v-for="article in articlesTop10" :key="article.id">
        <router-link :to="'/article/' + article.id">{{article.title}}</router-link>
        <div>
          <span>文: {{article.author}}</span>
          <span>主播: {{article.podcast}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    articlesTop10: Array
  }
}
</script>

<style scoped>
  .channel-top10 {
    width: 360px;
    background: #fff;
    padding: 30px;
    font-size: 12px;
    align-self: flex-start;
  }
  ul {
    list-style: decimal;
    color: #999;
    padding-left: 20px;
  }
  ul li {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    /* margin-left: 20px; */
  }
  .channel-top10 div {
    color: #999;
    margin-top: 2px;
  }
  .channel-top10 div span {
    margin-right: 20px;
  }
</style>
