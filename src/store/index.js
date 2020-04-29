import Vue from 'vue';
import Vuex from 'vuex';

import shop from './modules/shop';
import cart from './modules/cart';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
	state     : {},
	mutations : {},
	actions   : {},
	modules   : {
		shop,
		cart,
		user
	}
});
