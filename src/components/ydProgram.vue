<template>
    <div class="programs">
        <div class="pro-header">
            <span>{{type}}频道其他节目</span>
            <router-link :to="'/channel/' + typeid">查看全部&gt;</router-link>
        </div>
        <ul class="pro-list">
            <li v-for="(program,index) in programs" :key="index">
                <router-link :to="'/article/'+program.id">{{ program.title }}</router-link>
                <div class="program-info">
                    <span>文 : {{ program.author }}</span>
                    <span>主播 : {{ program.podcast }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        programs:Array,
        typeid:Number
    },
    computed:{
        type (){
            // console.log(this.typeid)
            if(this.typeid == 1){
                return '悦读FM'
            }else if(this.typeid == 2){
                return '情感'
            }else if(this.typeid == 3){
                return '连播'
            }else if(this.typeid == 4){
                return '校园'
            }else if(this.typeid == 5){
                return '音乐'
            }else if(this.typeid == 6){
                return 'labs'
            }
        }
    }

}
</script>

<style>
    .programs{
        width: 360px;
        position: absolute;
        right: -390px;
        top: 667px;
        background: #fff;
        color: #333;
        font-size: 12px;
        padding: 20px;
    }
    .programs .pro-header{
        width: 320px;
        display: flex;
        justify-content: space-between;
        border-left: 3px solid #ee5044;
        align-items: center;
    }
    .programs .pro-header>span{
        font-weight: bolder;
        font-size: 14px;
        padding-left: 10px;
    }
    .programs .pro-list{
        width: 320px;
        list-style: none;
        padding: 0;
        color: rgb(112,112,112);

    }
    .programs .pro-list li{
        margin: 20px 0;
        height: 50px;
        border-bottom: 1px dashed #EEE;
        display: flex;
        flex-flow: column wrap;
        justify-content: space-around;
    }
    .programs .pro-list li .program-info span:first-child{
        padding-right: 30px;
    }
</style>
