import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/page/test.vue'
import page_index from '../components/page/page_index.vue'


Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: { title: '自述文件' },
        children:[
             
            {
                path: '/404',
                component: resolve => require(['../components/page/404.vue'], resolve),
                meta: { title: '404' }
            },
            {
                path: '/test',
                component: test,
                meta:{title:'测试路由'}
            },
            {
                path : '/page_index',
                component : page_index,
                meta : {title:'首页管理'}
            } 
        ]
    }
    
]
})
