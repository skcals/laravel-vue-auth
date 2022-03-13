import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
	state: {
		user: {
			data: {},
			token: localStorage.getItem('token'),
		},
	},
	mutations: {
		setToken(state, token) {
			localStorage.setItem('token', token);
			state.user.token = token;
		},

		setUser(state, user) {
			state.user.data = user;
		},

		logout(state){
			state.user.token = null,
			state.user.data = {},
			localStorage.removeItem('token');
		}
	},
	actions: {
		register({ commit }, user) {
			return axiosClient.post("/register", user)
				.then((res) => {
					commit('setToken', res.data.token)
					commit('setUser', res.data.user)
					return res;
				})
		},

		login({ commit }, user) {
			return axiosClient.post("/login", user)
			.then((res) => {
				commit('setToken', res.data.token)
				commit('setUser', res.data.user)
				return res;
			})
		},

		logout({commit}){
			return axiosClient.post('/logout')
				.then(res => {
					commit('logout')
					return res
				})
		},

		getUser({ commit }) {
			return axiosClient.get("/user")
				.then(res => {
					commit('setUser', res.data)
				})
		}
	},
});

export default store;
