import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/page/test.vue'
import page_index from '../components/page/page_index.vue'
import gongsi_index from '../components/page/gongsi_index.vue'
import xinxiliu_index from '../components/page/xinxiliu_index.vue'
import lianmeng from '../components/page/lianmeng_index.vue';
import lainxiwomen_index from '../components/page/lainxiwomen_index.vue'
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
            },
            {
                path : '/gongsi_index',
                component : gongsi_index,
                meta : {title : '公司简介'}
            },
            {
                path : '/xinxiliu_index',
                component : xinxiliu_index,
                meta : {title :"oppo信息流"}

            },
            {
                path: '/lianmeng',
                component: lianmeng,
                meta:{title:'oppo联盟'}
            },
            {
                path: '/lainxiwomen_index',
                component: lainxiwomen_index,
                meta:{title:'联系我们'}
            } 
        ]
    }
    
]
})
