// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import '../static/icon/iconfont.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/icon/iconfont.js'
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import OSS from 'ali-oss'  
import $ from 'jquery'
import {success,error} from './js/message'
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
// axios.defaults.baseURL = 'http://49.235.234.99:7001';
axios.defaults.baseURL = 'http://localhost:7001';
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios;


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    var token = localStorage.getItem("djy_token");
   
    config.headers.OPPO_MY_TOKEN = localStorage.getItem('OPPO_MY_TOKEN');
    
  
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

 


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    console.log(response)
    if(response.data.code!=200){
        if(response.data.code==100){
            router.push({path:"/login"})
        }
        if(response.data.flg){
              error(response.data.msg)  ;
        }
    }else {
        if(response.data.flg){
            success(response.data.msg);
        }
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
