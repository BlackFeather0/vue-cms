<template>
  <div class="newsinfo-container">
    <h3 class="title">{{ news.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ news.add_time | dateFormat }}</span>
      <span>点击：{{ news.click }}次</span>
    </p>

    <hr />
    <div class="content" v-html="news.content"></div>
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import comment from "../subcomponents/comment.vue";
export default {
    
  data() {
    return {
      id: this.$route.params.id,
      news: ""
    };
  },
  created() {
    this.getnews();
  },
  methods: {
    getnews() {
      this.$http.get("api/getnew/" + this.id).then(res => {
        if (res.body.status === 0) {
        //   console.log(res.body);

          this.news = res.body.message[0];
        } else {
            Toast("数据获取失败！")
        }
      });
    }
  },
  components: {
    // 用来注册子组件的节点
    "comment-box": comment
  }
};
</script>
<style>
.newsinfo-container {
  padding: 0 5px;
}
.newsinfo-container .subtitle span {
    color: dodgerblue;
}
.newsinfo-container .content {
    font-size: 16px
}
.newsinfo-container .content img {
    width: 100%;
}
</style>
