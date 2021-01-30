import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueScrollactive from 'vue-scrollactive';
import VueLazyload from 'vue-lazyload';
import VModal from 'vue-js-modal';
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';

import capitalize from './filters/capitalize.filter';
import toFixed from './filters/toFixed.filter';
Vue.filter('capitalize', capitalize);
Vue.filter('toFixed', toFixed);

Vue.use(VueAxios, axios);
Vue.use(VueScrollactive);
Vue.use(VueLazyload);
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
