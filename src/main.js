import { createApp } from 'vue'
import store from './store'
import { createRouter, createWebHistory } from 'vue-router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})
import App from './App.vue'
import Users from './components/Users.vue'
import User from './components/User.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Users },
		{ path: '/user/:id',
			name: 'user',
			component: User,
		}
	]
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')