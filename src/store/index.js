import {createStore} from 'vuex'
import axios from 'axios'

const store = createStore({
	state: {
		users: [],
		user: null,
		albums: [],
		posts: []
	},
	mutations: {
		setUsers(state, users) {
			state.users = users
		},
		setUser(state, user) {
			state.user = user
		},
		setAlbums(state, albums) {
			state.albums = albums
		},
		setPosts(state, posts) {
			state.posts = posts
		},
		addPost(state, post) {
			state.posts.push(post)
		},
		updatePost(state, updatedPost) {
			const index = state.posts.findIndex(post => post.id === updatedPost.id)
			if (index !== -1) {
				state.posts.splice(index, 1, updatedPost)
			}
		}
	},
	actions: {
		async fetchUsers({ commit }) {
			const response = await axios.get('https://jsonplaceholder.typicode.com/users')
			commit('setUsers', response.data)
		},
		async fetchUser({ commit }, id) {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
			commit('setUser', response.data)
		},
		async fetchAlbums({ commit }, id) {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
			commit('setAlbums', response.data)
		},
		// ---------------------------------------------------------------- posts
		async fetchPosts({ commit }, id) {
			const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
			commit('setPosts', response.data)
		},
		async createPost({ commit }, post) {
			const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
			commit('addPost', response.data)
		},
		async updatePost({ commit }, post) {
			const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post)
			commit('updatePost', response.data)
		}
	}
})

export default store