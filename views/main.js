//引入mui样式
import "./assets/mui-master/dist/css/mui.min.css"
import "./assets/mui-master/examples/hello-mui/css/icons-extra.css"
import Vue from "vue"
// 导入路由 
import VueRouter from "vue-router"
// 安装路由 
Vue.use(VueRouter)
// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
//按需引入Header
import {Header,Swipe,SwipeItem} from "mint-ui"
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// import 'mint-ui/lib/style.css'
import App from "./App.vue"
import router from "./router.js"
var vm = new Vue({
    el: "#app",
    render: c => c(App),
    router
})