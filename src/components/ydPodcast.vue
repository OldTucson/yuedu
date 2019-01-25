<template>
    <div class="podcast">
      <div class="pod-info">
           <img width="80" height="80" src="http://yuedu.fm/static/file/member/70a6d48f7cc70d9e81e11a524067014c" alt="">
            <div class="pod-desc">
              <span>{{ podcast }}</span>
              <span>作品:39</span>
              <span>粉丝:189</span>
            </div>
            <div class="follow">关注</div>
      </div>
      <div class="pod-control">
        <div @click="like" class="pod-btn like" :class="likestyle">赞</div>
        <div>9</div>
        <div class="pod-btn mark">藏</div>
        <div>10</div>
        <div class="pod-btn tip">赏</div>
      </div>
        
    </div>
</template>

<script>
import axios from '../axios'
export default {
  
  props:{
    islike:Boolean,
    podcast:String
  },
  methods: {
    like () {
      axios.post('/article/' + this.$route.params.id + '/like').then(res => {
        if (res.data.res_code === 200) {
          this.$emit('change:liked', true)
        }
      })
    }
  },
  computed: {
    likestyle () {
      if(this.islike === true){
        return 'pod-like'
      }else{
        return ''
      }
    }
  },
  
}
</script>

<style>
    .podcast{
      width: 360px;
      position: absolute;
      right: -390px;
      top: 0;
      height: 233px;
      background: #fff;
    }
    .podcast>div{
      padding: 20px;
    }
    .podcast .pod-info{
      display: flex;
      align-content: flex-end;
      align-items: flex-end;
      justify-content: space-between;
      color: rgb(112,112,112);
      font-size: 12px;
    }
    .podcast .pod-info .pod-desc{
      display: flex;
      flex-flow: column wrap;
    }
    .podcast .pod-info .pod-desc span:first-child{
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 17px;
    }
    .podcast .pod-info .follow{
      width: 55px;
      height: 33px;
      background: #ee5044;
      line-height: 33px;
      color: white;
      text-align: center;
    }
    .podcast .pod-control{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .podcast .pod-control .pod-btn{
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 1px solid rgb(112,112,112);
      line-height: 52px;
      text-align: center;
      font-weight: normal;
    }
    .podcast .pod-control div{
      color: rgb(112,112,112);
      font-weight: bolder;
      transition: all 0.3s color;
    }
    .podcast .pod-control .pod-btn.pod-like{
      background: #ee5044;
      color: white;
      border: 1px solid #ee5044;
    }
    .podcast .pod-control .pod-btn:hover{
      background: #ee5044;
      color: white;
      border: 1px solid #ee5044;
    }
</style>
