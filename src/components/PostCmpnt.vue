<template>
  <v-card-title>{{ post.title }}</v-card-title>
  <v-card-text>{{ post.body }}</v-card-text>
  <v-card-actions>
    <v-btn @click="editPost(post)">Edit</v-btn>
  </v-card-actions>

  <div class="ma-2" v-if="isEditing">
    <h2>Edit Post</h2>
    <v-form @submit.prevent="updatePost">
      <v-text-field label="Title" v-model="editingPost.title"/>
      <v-textarea label="Body" v-model="editingPost.body"/>
      <v-btn type="submit">Save</v-btn>
    </v-form>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
defineProps({
  post: Object,
})
defineEmits(['edit'])

const editingPost = ref(null)
const isEditing = ref(false)

const editPost = (post) => {
  isEditing.value = !isEditing.value
  editingPost.value = {...post}
}

const updatePost = async () => {
  await store.dispatch('updatePost', editingPost.value)
  editingPost.value = null
}
</script>