<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id==0 ? 'mui-active' :'']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in cates"
            :key="item.id"
            @click="getimglist(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photolist">
      <router-link tag="li" :to="'/home/photoInfo/'+item.id" v-for="item in list" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="imginfo">
          <h1>{{ item.title }}</h1>
          <p>{{ item.zhaiyao }}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../assets/mui-master/examples/hello-mui/js/mui.js";
export default {
  data() {
    return {
      cates: "",
      list: ""
    };
  },
  mounted() {
    // 跳转
    mui("nav").on("tap", "a", function() {
      mui.openWindow({ url: this.href });
    });
    // 初始化滚动
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory();
    this.getimglist(0);
  },
  methods: {
    getAllCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        if (res.body.status === 0) {
          res.body.message.unshift({ title: "全部", id: 0 });
          this.cates = res.body.message;
        }
      });
    },
    getimglist(cateId) {
      this.$http.get("api/getimages/" + cateId).then(res => {
        // console.log(res);
        if (res.body.status === 0) {
          // console.log(res.body.message);
          this.list = res.body.message;
        }
      });
    }
  }
};
</script>
<style scoped>
* {
  touch-action: pan-y;
}
.photolist {

  padding: 0;
  margin: 0 20px;

  background-color: #efeff4;
}

.photolist li {
  position: relative;
  margin: 0;
  margin-bottom: 10px;
  list-style: none;
  box-shadow: 0 0 9px #999;
   background-color: #efeff4;
}
.photolist li img {
  width: 100%;
  vertical-align: middle;
}
image[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photolist .imginfo {
  position: absolute;
  bottom: 0;
  min-height: 84px;
  text-align: left;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.photolist .imginfo h1 {
  font-size: 14px;
}
.photolist .imginfo p {
  color: #fff;
  font-size: 13px;
}
</style>
