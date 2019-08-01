<template>
  <div class="mui-numbox" data-numbox-min="1">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="initCount"
      @change="countChanged"
      ref="numbox"
      readonly
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../assets/mui-master/examples/hello-mui/js/mui.js";
export default {
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChanged() {
      //   console.log(this.$refs.numbox.value);
      this.$store.commit("updateCount", {
        id: this.goodsid,
        count: parseInt(this.$refs.numbox.value)
      });
    }
  },
  props: ["initCount", "goodsid"],
  watch: {
    // 属性监听
    max: function(newVal, oldVal) {
      // 使用 JS API 设置 numbox 的最大值
      mui(".mui-numbox").numbox();
    }
  }
};
</script>
<style>
</style>
