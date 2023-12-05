<template>
  <div v-if="user">
    <h1 class="pl-10" @click="$router.push('/')">
      <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
      </svg>
      {{ user.name }}
    </h1>
    <v-tabs v-model="activeTab" class="pl-8">
      <v-tab :to="{ name: 'user', params: { id: $route.params.id }, query: {tab: 'posts'} }">Посты</v-tab>
      <v-tab :to="{ name: 'user', params: { id: $route.params.id }, query: {tab: 'albums'} }">Альбомы</v-tab>
    </v-tabs>
    <v-window v-model="activeTab" class="pa-7">
      <v-window-item value="posts">
        <v-btn variant="flat" @click="addNewPost=!addNewPost">Add Post</v-btn>
        <form class="ma-12" @submit.prevent="addPost" v-if="addNewPost">
          <v-text-field label="Title:" v-model="newPost.title"/>
          <v-textarea label="Body:" v-model="newPost.body"/>
          <v-btn type="submit">Add</v-btn>
        </form>
        <v-card v-for="post in posts" :key="post.id" rounded="xl" class="mx-3 my-5 neomorph">
          <post-cmpnt :post="post"/>
        </v-card>
      </v-window-item>
      <v-window-item value="albums">
        <div v-if="albums" v-for="album in albums" :key="album.id">
          <v-card-title>{{ album.title }}</v-card-title>
          <div class="ma-3" v-if="albums">
            <div class="carousel" v-if="albums">
              <img class="box neomorph" :src="album.photos[currentPhotoIndex].thumbnailUrl"
                   :alt="album.photos[currentPhotoIndex].title">
            </div>
          </div>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import axios from 'axios'
import PostCmpnt from './PostCmpnt.vue'

const store = useStore()
const route = useRoute()
const user = ref(null)
const albums = ref([])
const posts = ref([])
const currentPhotoIndex = ref(0)
let intervalId = null
const addNewPost = ref(false)
const newPost = ref({title: '', body: ''})

onMounted(async () => {
  const userId = route.params.id
  await store.dispatch('fetchUser', userId)
  user.value = store.state.user

  await store.dispatch('fetchAlbums', userId)
  albums.value = store.state.albums

  for (let album of albums.value) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
    album.photos = response.data
  }

  await store.dispatch('fetchPosts', userId)
  posts.value = store.state.posts

  intervalId = setInterval(() => {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % 5
  }, 2000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const addPost = async () => {
  await store.dispatch('createPost', {...newPost.value, userId: user.value.id})
  newPost.value = {title: '', body: ''}
}

const activeTab = ref(route.query.tab)
watch(route, () => {
  activeTab.value = route.query.tab
})
</script>

<style lang="scss">
.box {
  justify-content: center;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 50px;
}

.neomorph {
  box-shadow: 10px 10px 30px #bebebe,
  -10px -10px 30px #ffffff;
}

.carousel {
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
