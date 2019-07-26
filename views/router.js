import VueRouter from "vue-router"
//引入home 组件
import home from "./components/tabbar/homeContainer.vue"
import member from "./components/tabbar/memberContainer.vue"
import shopcar from "./components/tabbar/shopcarContainer.vue"
import search from "./components/tabbar/searchContainer.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"
import photolist from "./components/photos/photolist.vue"
import photoInfo from "./components/photos/photoinfo.vue"
import goodlist from "./components/goods/goodlist.vue"
import goodInfo from "./components/goods/goodInfo.vue"
import gooddesc from "./components/goods/goodDesc.vue"
import goodscomment from "./components/goods/goodComment.vue"
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
        }, {
            path:"/home/newsList",component:newsList
        }, {
            path:"/home/newsInfo/:id",component:newsInfo
        },{
            path:'/home/photolist',component:photolist
        }, {
            path:"/home/photoInfo/:id",component:photoInfo
        },{
            path:"/home/goodlist",component:goodlist
        },{
            path:"/home/goodInfo/:id",component:goodInfo,name:"goodInfo"
        },{
            path:"/home/gooddesc/:id",component:gooddesc,name:"gooddesc"
        },{
            path:"/home/goodscomment/:id",component:goodscomment,name:"goodscomment"
        }
    ],
    linkActiveClass: 'mui-active'
})
export default router