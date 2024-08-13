<script setup>
const { $bus } = useNuxtApp()
const { user } = useAuthStore()

const waitDialog = ref(false)
const drawer = ref(true)
const snacko = ref({
  message: '',
  color: '',
  open: false,
})

$bus.$on('waitDialog', (dialogValue) => {
  waitDialog.value = dialogValue
})
$bus.$on('errorSnack', (theSnack) => {
  snacko.value.color = 'error'
  snacko.value.message = theSnack.message
  snacko.value.open = true
})
$bus.$on('okSnack', (theSnack) => {
  snacko.value.color = theSnack.color
  snacko.value.message = theSnack.message
  snacko.value.open = true
})
$bus.$on('openDrawer', () => {
  drawer.value = !drawer.value
})
onBeforeUnmount(() => {
  $bus.$off('waitDialog')
  $bus.$off('errorSnack')
  $bus.$off('okSnack')
  $bus.$off('openDrawer')
})
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
      <div class="pt-3 px-3">Wilujeng, {{ user.profile.userName }}</div>
      <LazyTheMenu />
    </v-navigation-drawer>
    <v-app-bar density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title></v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>

    <v-snackbar v-model="snacko.open" :color="snacko.color" multi-line>
      {{ snacko.message }}

      <template v-slot:actions>
        <v-btn :color="snacko.color" variant="text" @click="snacko.open = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>