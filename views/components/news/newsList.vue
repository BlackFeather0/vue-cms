<template>
  <div>
      <!-- 新闻列表页面 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img
            class="mui-media-object mui-pull-left"
            :src="item.img_url"
          />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>时间：{{ item.add_time | dateFormat }}</span>
              <span>点击次数: {{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    
    data() {
        return {
            newsList:null
        }
    },
    created() {
        this.getNewsList()
    },
    methods:{
        getNewsList() {
            this.$http.get("api/getnewslist")
            .then((res)=>{
                if(res.body.status===0) {
                    // console.log(res.body.message);
                    this.newsList = res.body.message
                } else {
                    Toast("数据获取失败！")
                }
            })
        }
    }
};
</script>
<style scoped>
.mui-table-view li h1 {
  font-size: 14px;
}
.mui-table-view li p {
  font-size: 12px;
  color: dodgerblue;
  display: flex;
  justify-content: space-between;
}
</style>

