import VueRouter from "vue-router"
//引入home 组件
import home from "./components/tabbar/homeContainer.vue"
import member from "./components/tabbar/memberContainer.vue"
import shopcar from "./components/tabbar/shopcarContainer.vue"
import search from "./components/tabbar/searchContainer.vue"


var router = new VueRouter({
    routes: [
        {
            path:"/",component:home
        },
        {
            path:"/home",component:home
        }, {
            path:"/member",component:member
        }, {
            path:"/shopcar",component:shopcar
        }, {
            path:"/search",component:search
        }
    ],
    linkActiveClass: 'mui-active'
})
export default router