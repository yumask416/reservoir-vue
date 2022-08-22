// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Notification } from 'element-ui'
import ajax from 'axios'
import 'vue-area-linkage/dist/index.css';
import VueAreaLinkage from 'vue-area-linkage';

// import ElementUI
//应用插件
Vue.prototype.$notify = Notification;
Vue.use(ElementUI);
Vue.use(VueAreaLinkage)
Vue.config.productionTip = false;
ajax.defaults.baseURL = 'http://127.0.0.1:10225';
// ajax.defaults.baseURL = 'http://10.10.10.119:10225';
// ajax.defaults.baseURL = 'http://10.10.10.226:10225';
// ajax.defaults.baseURL = 'http://10.10.10.101:4000';
// ajax.defaults.baseURL = 'http://10.10.10.39:4000';
// ajax.defaults.headers.post['Content-Type'] = 'application/json'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

/*
{"event_type":"Y03","image":"event_img/1/27/1650334811000804352.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.204:554/stream1","timestamp":"1650334811000804352","event_off":"-1","thread_id":"1"}
{"event_type":"Y03","image":"warning/2/1650334811000868096.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.217:554/stream1","timestamp":"1650334811000868096","event_off":"1","thread_id":"2"}
{"event_type":"Y03","image":"event_img/1/27/1650334811000869120.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.208:554/stream1","timestamp":"1650334811000869120","event_off":"-1","thread_id":"3"}
{"event_type":"Y03","image":"event_img/1/27/1650334811000942592.jpeg","rtsp_addr":"rtsp://admin:A1234567@10.10.10.210:554/stream1","timestamp":"1650334811000942592","event_off":"-1","thread_id":"4"}

* */
