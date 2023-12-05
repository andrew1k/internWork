<template>
  <v-app id="app">
    <v-main>
      <router-view v-slot="{ Component }">
        <v-container class="mx-auto">
          <transition name="fade" mode="out-in">
            <component :is="Component"/>
          </transition>
        </v-container>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>

</script>

<style lang="scss">
#app {
  align-items: center;
  background-color: #e0e0e0;
  display: flex;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
