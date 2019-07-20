<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item , i) in comments" :key="i">
        <div
          class="cmt-title"
        >第{{ 1+i }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
        <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // 获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            //   console.log(result.body.message);

            // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    //发表评论
    postComment() {
      this.$http
        .post("api/postcomment/" + this.id, {
          content: this.msg.trim()
        })
        .then(res => {
            if(res.body.status === 0) {
                let info = {
                    user_name:'匿名',
                    add_time:Date.now(),
                    content:this.msg.trim()
                }
                this.comments.unshift(info)
                this.msg=""
            }
        });
    }
  },
  props: ["id"]
};
</script>
<style scoped>
.cmt-container h3 {
  font-size: 18px;
}
.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}

.cmt-container .cmt-list {
  margin: 5px 0;
}
.cmt-container .cmt-item {
  font-size: 13px;
}
.cmt-container .cmt-title {
  line-height: 30px;
  background-color: #ccc;
}
.cmt-item .cmt-title .cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>
