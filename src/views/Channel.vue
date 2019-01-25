<template>
  <div class="box">
    <!-- <div class="aritcles-list"></div> -->
    <ydList :articles="articles"></ydList>
    <ydTop10 :articlesTop10="articlesTop10"></ydTop10>
  </div>
</template>

<script>
import axios from "../axios";
import ydList from '../components/ydList'
import ydTop10 from '../components/ydTop10'
export default {
  components: {
    ydList, 
    ydTop10
  },
  data () {
    return {
      articles: [],
      articlesTop10: []
    }
  },
  watch: {
    '$route': {
      handler (to) {
        // 获取到url中的id
        const id = to.params.id
        // 然后通过这个id获取对应的数据
        // "articles/" + id + '/page/1'
        axios.get(`/articles/${id}/page/1`).then(res => {
          console.log(res.data)
          this.articles = res.data.res.articles
        })

        axios.get(`/articles/${id}/top10`).then(res => {
          this.articlesTop10 = res.data.res
        })
      },
      immediate: true
    }
  }
}
</script>

<style>
  .box {
    width: 1010px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
</style>
