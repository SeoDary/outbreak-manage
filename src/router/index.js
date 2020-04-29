import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Manage,
    redirect: "/login",
  },
  {
    path: '/login',
    component: ()=>import("../views/login/index.vue")
  },
  {
    path: '/manage',
    component: Manage,
    redirect: "/homePage",
    children: [
      {
        path: "/article",
        name: "新闻",
        component: () => import("../views/article/index.vue")
      },
      {
        path: "/article/add",
        name: "新闻添加",
        component: () => import("../views/article/addNews.vue")
      },
      {
        path:'/homePage',
        name:'首页部分',
        component:()=>import("../views/homePage/list.vue")
      },
      {
        path:'/homePage/index',
        name:'首页部分',
        component:()=>import("../views/homePage/index.vue")
      },
      {
        path:'/message',
        name:'首页部分',
        component:()=>import("../views/message/index.vue")
      },

    ]
  }
]


const router = new VueRouter({
  routes
})

/*router.beforeEach((to, from, next)=>{
  var token = localStorage.getItem("token");
  if(to.path == "/login"){
    next();
  }else{
    if(token){
      next();
    }else{
      next("/login")
    }
  }
})*/

export default router
