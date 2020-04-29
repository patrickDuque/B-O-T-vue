import items from '../items';

const state = {
	shop : []
};

const getters = {
	getShop : (state) => state.shop
};

const mutations = {
	getItems : (state) => {
		state.shop = items;
	}
};

const actions = {};

export default {
	namespaced : true,
	state,
	getters,
	mutations,
	actions
};
