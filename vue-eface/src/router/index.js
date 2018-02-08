import Vue from 'vue'
import Router from 'vue-router'
import Login from 'page/login/login.vue'
import Home from 'page/home.vue'
import controlLibraryList from 'page/controlLibraryList.vue'
import homePage from 'page/homePage/homePage.vue'  // 首页
import faceSpecialManager from 'page/faceSpecialManager.vue'  // 专题库列表
import fSpecialManagerDetail from 'page/faceSpecialManagerDetail.vue' //专题库详情
import search from 'page/search/search.vue' //搜索页面
import realAlarm from 'page/realAlarm/realAlarm.vue' //实时告警
import faceArchivesManager from 'page/faceArchivesManager.vue' //一人一档
import historyAlarm from 'page/historyAlarm.vue' //历史告警
import faceStoreDetail from 'page/faceStoreDetail.vue' //布控库管理详情
import faceArchivesManagerDetai from 'page/faceArchivesManagerDetai.vue' //档案库管理详情
import faceIdentityManager from 'page/faceIdentityManager.vue' //待身份确认页面
import test from 'page/test.vue' //测试

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
        path: '/test',
        name: 'test',
        component: test
      },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
         {
            path: '/controlLibraryList',
            name: 'controlLibraryList',
            component: controlLibraryList
         },
         {
          path: '/homePage',
          name: 'homePage',
          component: homePage
       },
       {
          path: '/faceSpecialManager',
          name: 'faceSpecialManager',
          component: faceSpecialManager
        },
        {
          path: '/fSpecialManagerDetail',
          name: 'fSpecialManagerDetail',
          component: fSpecialManagerDetail
        },
         {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/faceArchivesManager',
          name: 'faceArchivesManager',
          component: faceArchivesManager 
        },
        {
            path: '/realAlarm',
            name: 'realAlarm',
            component: realAlarm
        },
        {
          path: '/historyAlarm',
          name: 'historyAlarm',
          component: historyAlarm
        },
        {
          path: '/faceStoreDetail',
          name: 'faceStoreDetail',
          component: faceStoreDetail
        },
        {
          path: '/faceArchivesManagerDetai',
          name: 'faceArchivesManagerDetai',
          component: faceArchivesManagerDetai
        },
        {
          path: '/faceIdentityManager',
          name: 'faceIdentityManager',
          component: faceIdentityManager
        }
      ]
    }]
})