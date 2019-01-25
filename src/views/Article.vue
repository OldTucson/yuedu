<template>
  <div class="article" v-if="!noData">
    <ydPodcast @change:liked="changeLike" :islike="article.isLiked" :podcast="article.podcast"></ydPodcast>
    <ydBanner :articles="bannerArticles"></ydBanner>
    <ydProgram :programs="programs" :typeid="typeid"></ydProgram>
    <div class="article-info">
      <p class="article-title">
        {{ article.title }}
      </p>
      <div class="article-base">
        <div>
          <span>{{ article.author }}</span>
          <span>{{ article.podcast }}</span>
          <span>{{ article.duration }}</span>
        </div>
        <div class="play-time">播放<span>{{ article.play_time }}</span>次</div>
      
      </div>
      
      <img :src="article.img_url"/>
    </div>
    <div class="article-content" v-html="article.content" :class="{'content-intro':showAll}"></div>
    <div class="article-control"><span v-if="article.content.length > 600" @click="readAll">{{all ? '收起' : '展开全文'}}</span></div>
    <div class="article-labels">标签:<a href="">{{ article.labels | formatLabels }}</a></div>
    <div class="article-page"><router-link :to="'/article/' + (article.id - 1)">&lt;上一篇</router-link><router-link :to="'/article/' + (article.id + 1)">下一篇&gt;</router-link></div>
    <div class="comments">
      <p class="comments-title">最新评论 ( {{ comments.length }} )</p>
      <div class="post-comment">
        <input type="text" v-model="content" class="input-comment" placeholder="说点什么吧!">
        <div @click="addComment" class="btn-comment">评论</div>
      </div>
      <div class="comments-list" v-if="comments && comments.length">
        <div class="comment" v-for="(comment,index) in comments" :key="comment.id">
          <div class="comment-left">
            <img width="40" height="40" src="http://yuedu.fm/static/file/member/70a6d48f7cc70d9e81e11a524067014c" alt="">
            <div class="comment-info">
              <div class="comment-header">
                <span class="nikiname">{{ comment.nikiname }}</span>
                <span class="reply-time">{{ comment.reply_time }}</span>
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
            </div>
          </div>
          <a class="del" v-if="comment.isDel" @click="delComment(comment.id,index)">X</a>
        </div>
      </div>
      <div class="no-comments" v-else>
        暂无评论
      </div>
      
    </div>
    
  </div>
  <div v-else>页面丢失啦</div>
</template>

<script>
import axios from '../axios'
import ydPodcast from '../components/ydPodcast'
import ydBanner from '../components/ydBanner'
import ydProgram from '../components/ydProgram'
export default {
  components:{
    ydPodcast,
    ydBanner,
    ydProgram
  },
  data () {
    return {
      typeid:1,
      programs:[],
      bannerArticles:[],
      content:'',
      noData:false,
      all:false,
      article:{
        content:'',
        labels:'',
        isLiked:''
        
      },
      comments:[1,]
    }
  },
  methods:{
    readAll (){
      this.all = !this.all
    },
    addComment () {
      const article_id = this.$route.params.id
      axios.post('/comment',{
        article_id,
        content:this.content
      }).then(res => {
        this.comments.push(res.data.res)
        this.content = ""
      })
    },
    delComment (id,index) {
      axios.delete('/comment/' + id).then(res => {
        if(res.data.res_code === 200) {
          this.comments.splice(index,1)
        }
      })
    },
    changeLike (state) {
      
      this.article.isLiked = state
    }
  },
  watch:{
    '$route': {
      handler (to) {
        axios.get('/article/' + to.params.id).then(res => {
          // this.islike = res.data.res.isLiked
          this.all = false
          this.noData = false
          // console.log(res.data)
          if (!(res.data.res_code === 200)) {
            // this.article.isLiked = false
            
            this.noData = true
          }else {
            this.article = res.data.res
            this.typeid = res.data.res.type_id
            return this.article.type_id
          }

        }).then(id => {
          return axios.get('/articles/' + id + '/rand')
        }).then(res => {
          this.programs = res.data.res
          
          // console.log(this.programs)
        })

        this.comments = []
        axios.get('/comments/' + to.params.id +'/page/1').then(res => {
          if (res.data.res_code === 200){
            this.comments = res.data.res
          }
          
        })

        axios.get('/articles/rand').then(res => {
          let articles = res.data.res
          const arr = []
          for(let i = 0; i < 5; i++){
            const articlesItem = []
            for (let j = 0; j < 4;j++){
              const index = j + i * 4
              articlesItem.push(articles[index])
            }
            arr.push(articlesItem)
          }
          this.bannerArticles = arr
          // console.log(this.bannerArticles)
        })
      },
      immediate:true
    }
  },
  created () {
    
  },
  computed:{
    showAll (){
      return this.article.content.length > 600 && !this.all
    }
  },
  filters:{
    formatLabels (value) {
      return value.split(',').join(' ')
    }
  }
}
</script>

<style scoped>
  .article{
    position: relative;
    width:620px;
    margin-left: 447px;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: center;
    align-items: center;
  }
  .article .article-content{
    text-indent: 30px;
    width: 560px;
    padding-top: 30px;
    /* height: 250px;
    overflow: hidden; */
    /* line-height: 30px; */
  }
   .article .article-control{
     padding-top: 20px;
     width: 560px;
     display: flex;
     justify-content: flex-end;
     font-size: 12px;
     color: rgb(112, 112, 112);
   }
   .article .content-intro{
    height: 250px;
    overflow: hidden;
   }
   .article .article-page{
     padding-top: 30px;
     font-size: 14px;
     /* color: rgb(112, 112, 112); */
     width: 560px;
     display: flex;
     justify-content: space-between;
   }
  .article .article-info{
    padding-top: 30px;
    width: 560px;
  }
  .article .article-labels{
    width: 560px;
    font-size: 12px;
    color: rgb(112, 112, 112);
    margin-top: 40px;
  }
  .article .article-info .article-title{
    color: rgb(112, 112, 112);
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 15px;
  }
  .article .article-info .article-base{
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
  }
  .article .article-info .article-base .play-time{
    font-size: 15px;
  }
  .article .article-info .article-base>div:first-child span{
    margin-right: 15px;
  }
  .article .comments {
    width: 560px;
    padding-top: 30px;
  }
  .article .comments .comments-title{
    font-size: 14px;
    color: #ee5044;
    margin-bottom: 30px;
  }
  .article .comments .comments-list{
    width:560px;
  }
  .article .comments .comments-list .comment{
    width: 560px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed #EEE;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .article .comments .comments-list .comment .comment-left{
    display: flex;
  }
  .article .comments .comments-list .comment .comment-left .comment-info{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
  }
  .article .comments .comments-list .comment .comment-left .comment-info .comment-header>span{
    font-size: 12px;
    color: #333;
  }
  .article .comments .comments-list .comment .comment-left .comment-info .comment-header>span:first-child{
    font-weight: bolder;
    font-size: 14px;
    padding-right: 5px;
  }
  .article .comments .comments-list .comment .comment-left .comment-info .comment-content{
    font-size: 12px;
    color: rgb(122,122,122);
  }
  .article .comments .comments-list .comment .del{
    cursor: pointer;

  }
  .article .comments .no-comments{
    font-size: 15px;
    color:rgb(112, 112, 112);
  }
  .article .comments .post-comment{
    display: flex;
    padding: 20px 0;
  }
  .article .comments .post-comment .input-comment{
    width:480px;
    height: 50px;
    border: none;
    outline: none;
  }
  .article .comments .post-comment .btn-comment{
    height: 50px;
    width: 80px;
    background: #ee5044;
    color: white;
    text-align: center;
    line-height: 50px;
    font-size: 12px;
  }
</style>
