//引入mui样式
import "./assets/mui-master/dist/css/mui.min.css"
import "./assets/mui-master/examples/hello-mui/css/icons-extra.css"
import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
    state:{
        car
    },
    mutations:{
        addCar(state,product) {
            let flag =false
            state.car.some(item=>{
                if(item.id==product.id) {
                    item.count += parseInt(product.count)
                    flag = true
                    return true
                }
            })
            if(!flag) state.car.push(product)
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllcount(state) {
            let c = 0
            state.car.forEach(item=>{
                c += item.count
            })
            return c
        }
    }
})
// 导入路由 
import VueRouter from "vue-router"
// 安装路由 
Vue.use(VueRouter)
// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
Vue.http.options.root = "http://www.liulongbin.top:3005"
import VuePreview from "vue-preview"
Vue.use(VuePreview)
//时间过滤
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
//按需引入Header
import Mintui from "mint-ui"
Vue.use(Mintui);
// import 'mint-ui/lib/style.css'
import App from "./App.vue"
import router from "./router.js"
var vm = new Vue({
    el: "#app",
    render: c => c(App),
    router,
    store
})