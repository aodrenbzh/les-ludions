// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-les-ludions
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-les-ludions/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import MaterialKit from "./plugins/les-ludions";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);

library.add([faUserSecret, faUserAlt]);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(MaterialKit);

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
});

const NavbarStore = {
  showNavbar: false
};

const Artistes = [];

Vue.mixin({
  data() {
    return {
      NavbarStore,
      Artistes
    };
  },
  methods: {
    shuffle: function (a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
