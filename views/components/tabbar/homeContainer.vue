<template>
  <div container-home>
  <!-- 轮播图 -->
  <swiper :lunbotuList="lunbotuList" class="mint-swipe" :isfull='true'></swiper>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/newsList">
          <img src="../../images/menu1(1).png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <router-link to="/home/goodlist" href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4">
        <a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import swiper from '../subcomponents/swiper.vue'
export default {
    data() {
        return {
            lunbotuList :null
        }
    },
    created() {
        this.getlunbotu()
    },
    methods: {
        getlunbotu() {
            this.$http.get("api/getlunbo")
            .then(res=>{
                if(res.body.status ===0) {
                    this.lunbotuList = res.body.message
                } else {
                    //失败
                }
            })
        }
    },
    components:{
      swiper
    }
};
</script>
<style scoped>
.mint-swipe {
  height: 130px;
}
.mint-swipe-items-wrap img{
    width: 100%;
    height: 100%;
}
.mui-table-view {
    background-color: #fff;
}
.mui-table-view img{
    width: 60px;
    height: 60px;
}
.mui-table-view .mui-table-view-cell {
    border: 0;
}
</style>


