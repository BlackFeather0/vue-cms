<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <swiper :lunbotuList="lunbotu" class="goods-lunbotu" :isfull="false"></swiper>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <del>{{goodsInfo.market_price}}</del> &nbsp;&nbsp; 销售价：
            <span class="now_price">{{goodsInfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsInfo.stock_quantity"></numbox>
          </p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="small">立即购买</mt-button>
        <mt-button type="danger" class="fl" size="small" @click="addToShopCar">加入购物车</mt-button>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsInfo.goods_no }}</p>
          <p>库存情况：{{ goodsInfo.stock_quantity }}</p>
          <p>上架时间：{{ goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/numberBox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      ballFlag: false,
      goodsInfo: {},
      selectedCount:1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        // console.log(res.body);

        if (res.body.status === 0) {
          res.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = res.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          console.log(res);
          this.goodsInfo = res.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "gooddesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.opacity = 1
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
        const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    //子组件向父组件传值
    getSelectedCount(count) {
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>
<style scoped>
.now_price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
.goods-lunbotu {
  height: 200px;
}
.goods-lunbotu img {
  width: 100px !important;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 0 15px;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 999;
  top: 390px;
  left: 146px;
}
</style>
