import axios from 'axios';
import router from '../../router/index';

const state = {
	auth   : false,
	userId : null,
	token  : null,
	name   : null
};

const getters = {
	getId     : (state) => state.userId,
	authCheck : (state) => state.auth
};

const mutations = {
	authUser : (state, data) => {
		state.auth = true;
		state.userId = data._id;
		state.name = data.name;
		console.log(state);
	},
	logout   : (state) => {
		state.auth = false;
		state.userId = null;
		state.name = null;
		localStorage.removeItem('name');
		localStorage.removeItem('userId');
	}
};

const actions = {
	signup       : ({ commit }, data) => {
		axios.post('https://loud-giddy-firewall.glitch.me/user/signup', data).then((res) => {
			router.push('/');
			commit('authUser', res.data.result);
			localStorage.setItem('userId', res.data.result._id);
			localStorage.setItem('name', res.data.result.name);
		});
	},
	login        : ({ commit }, data) => {
		axios.post('https://loud-giddy-firewall.glitch.me/user/signin', data).then((res) => {
			commit('authUser', res.data);
			localStorage.setItem('userId', res.data._id);
			localStorage.setItem('name', res.data.name);
			router.push('/');
		});
	},
	tryAutoLogin : ({ commit, dispatch }) => {
		const _id = localStorage.getItem('userId');
		const name = localStorage.getItem('name');
		commit('authUser', { _id, name });
		dispatch('autoLogout');
	},
	autoLogout   : ({ commit }) => {
		setTimeout(() => {
			commit('logout');
		}, 21600000);
	}
};

export default {
	namespaced : true,
	state,
	getters,
	mutations,
	actions
};
