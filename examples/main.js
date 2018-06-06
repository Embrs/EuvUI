/**
 * Created by aresn on 16/6/20.
 */
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import EuvUI from '../src/index';
// import EuvUI from '../dist/euvui.min.js';
// import locale from '../src/locale/lang/en-US';
import locale from '../src/locale/lang/en-US';

Vue.use(VueRouter);
// Vue.use(EuvUI, { locale });
Vue.use(EuvUI);
// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    esModule: false,
});

const app = new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
