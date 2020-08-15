import Vue from 'vue'
import './plugins/iview.js'
import VueRouter from 'vue-router';
import App from './App';
import Routers from './router.js';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import axios from 'axios';
import QS from 'qs'
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.use(ViewUI, {
  transfer: true,
  size: 'large',
  select: {
    arrow: 'md-arrow-dropdown',
    arrowSize: 20
  }
});
Vue.prototype.$axios = axios;
Vue.prototype.$qs = QS;
// The routing configuration
const RouterConfig = {
  routes: Routers
};
let router = new VueRouter(RouterConfig);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
});
