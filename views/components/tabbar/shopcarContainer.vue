<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item , i) in goodlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price* $store.getters.getGoodsCount[item.id]}}</span>
                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="javascript:;" @click="delGoods(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getCountAndAmount.count }}</span> 件， 总价
              <span class="red">￥{{$store.getters.getCountAndAmount.amount}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodlist: []
    };
  },
  created() {
    this.gerGoodlist();
    
  },
  methods: {
    gerGoodlist() {
      var idArr = [];
      this.$store.state.car.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(res => {
          if (res.body.status === 0) {
            this.goodlist = res.body.message;
          }
        });
    },
    delGoods(id,i) {
      this.goodlist.some(item=>{
        if(item.id ==id) {
          this.goodlist.splice(i,1)
        }
      })
      this.$store.commit("removeGoods",id)
    },
    selectChange(id,val) {
      // console.log(val);
      this.$store.commit("updataGoodsSelect",{id,selected:val})
    }
  },
  components: {
    numbox
  }
};
</script>
<style scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
}
.shopcar-container .goods-list {
  margin: 0;
  padding: 0;
}
.shopcar-container .goods-list .mui-card-content-inner {
  display: flex;
  align-items: center;
}
.shopcar-container .goods-list img {
  width: 60px;
}
.shopcar-container .goods-list h1 {
  padding: 0 10px;
  width: 215px;
  font-size: 13px;
}
.shopcar-container .goods-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.shopcar-container .goods-list .info p {
  margin-top: 10px;
  margin-bottom: 0;
}
.shopcar-container .goods-list .info .price {
  color: red;
  font-weight: bold;
}
.jiesuan {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.jiesuan .red {
  color: red;
  font-weight: bold;
  font-size: 16px;
}
</style>
