<template>
  <div class="goodsdesc-container">
    <h3>{{info.title}}</h3>
    <hr />
    <div class="content" v-html="info.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      info: ""
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$http.get("api/goods/getdesc/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.info = res.body.message[0];
        }
      });
    }
  }
};
</script>
<style>
.goodsdesc-container{
  padding: 4px;
}

.goodsdesc-container h3 {
  font-size: 16px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
.goodsdesc-container .content img {
  width: 100%;
}
</style>
