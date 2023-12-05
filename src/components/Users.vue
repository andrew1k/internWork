<template>
  <v-card variant="text">
    <h1>Список пользователей</h1>
    <v-card class="ma-2" rounded="xl" elevation="0" v-for="user in users" :key="user.id">
      <v-card-title>{{ user.name }}</v-card-title>
      <v-card-subtitle>{{ user.email }}</v-card-subtitle>
      <v-card-actions>
        <v-btn :to="`/user/${user.id}`">Подробнее</v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useStore} from 'vuex'

const store = useStore()
const users = ref([])

onMounted(async () => {
  await store.dispatch('fetchUsers')
  users.value = store.state.users
})
</script>

<style lang="scss" scoped>

</style>
