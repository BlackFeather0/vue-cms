<template>
  <div class="container">
    <!-- header部分 -->
    <mt-header fixed title="xxx · Vue项目">
      <span slot="left" @click="back" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <!-- router部分 -->
    <transition>
      <router-view></router-view>
    </transition>
    <!-- footer部分 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllcount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
import mui from "../views/assets/mui-master/examples/hello-mui/js/mui.js";
export default {
  data() {
    return {
      flag : false
    }
  },
  created() {
    // console.log(this.$route);
    this.flag = this.$route.path ==='/home'? false : true
  },
  mounted() {
    mui("nav").on("tap", "a", function() {
      mui.openWindow({ url: this.href });
    });
  },
  methods: {
    back() {
      this.$router.go(-1)
    }
  },watch: {
    "$route.path": function(newVal) {
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style>
* {
  touch-action: pan-y;
}
.mint-header.is-fixed {
  z-index: 99;
}
.container {
  padding: 40px 0 53px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>