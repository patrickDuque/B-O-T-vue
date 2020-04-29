import axios from 'axios';

const state = {
	cart   : [],
	orders : []
};

const getters = {
	getCart  : (state) => state.cart,
	getOrder : (state) => state.orders
};

const mutations = {
	getCart   : (state, cart) => {
		console.log(state);
		state.cart = cart;
	},
	getOrders : (state) => {
		const order = [
			...state.cart
		];
		state.orders = order;
	},
	clearCart : (state) => {
		state.cart = [];
	},
	orderPass : (state, item) => {
		state.orders.push(item);
	}
};

const actions = {
	addToCart      : ({ commit }, data) => {
		axios.post(`https://loud-giddy-firewall.glitch.me/cart/${data.id}`, data.data).then(() => {
			axios.get(`https://loud-giddy-firewall.glitch.me/cart/${data.id}`).then((data) => {
				commit('getCart', data.data.cart);
			});
		});
	},
	initCart       : ({ commit }, id) => {
		axios.get(`https://loud-giddy-firewall.glitch.me/cart/${id}`).then((data) => {
			commit('getCart', data.data.cart);
		});
	},
	removeFromCart : ({ commit }, data) => {
		axios.delete(`https://loud-giddy-firewall.glitch.me/cart/${data.id}/${data.data.itemId}`, data.data).then(() => {
			axios.get(`https://loud-giddy-firewall.glitch.me/cart/${data.id}`).then((data) => {
				commit('getCart', data.data.cart);
			});
		});
	}
};

export default {
	namespaced : true,
	state,
	getters,
	mutations,
	actions
};
