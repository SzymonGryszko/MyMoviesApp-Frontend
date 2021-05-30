import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


library.add(faUserSecret);

//API 
Vue.use(Vuelidate);
Vue.use(VueAxios, axios)
Vue.prototype.$api = 'https://localhost:44330/api/movies'

//Toast
Vue.use(VueToast);

//Vuelidate
Vue.use(Vuelidate);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  validations:{},
  render: h => h(App)
}).$mount('#app')
