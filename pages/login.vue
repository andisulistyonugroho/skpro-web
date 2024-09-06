<script setup>
definePageMeta({
  layout: '',
  middleware: 'auth'
})
const { $debounce, $router } = useNuxtApp()
const { login } = useAuthStore()
const passType = ref(false)
const loginF = ref()
const payload = ref({
  username: null,
  password: null
})

const doLogin = $debounce(async () => {
  const validation = await loginF.value.validate()
  if (!validation.valid) {
    return true
  }
  const loginresponse = await login(payload.value)
  if (loginresponse) {
    $router.replace('/')
  }
}, 1000, { leading: true, trailing: false })
</script>

<template>
  <v-app>
    <v-main style="background-color: #6E2D30;">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" md="4" offset-md="4">
            <v-card variant="tonal" color="secondary" class="pt-10 pb-5" rounded="xl">
              <v-card-title class="text-center">Central Kitchen</v-card-title>
              <v-card-text class="pt-10">
                <v-form ref="loginF" lazy-validation>
                  <v-text-field v-model="payload.username" :rules="[v => !!v || 'item required']" variant="underlined"
                    rounded="lg" label="Username*" clearable id="username" />
                  <v-text-field v-model="payload.password" :rules="[v => !!v || 'item required']" rounded="lg"
                    variant="underlined" label="Password*" :append-inner-icon="passType ? 'i-mdi-eye-off' : 'i-mdi-eye'"
                    :type="passType ? 'password' : 'text'" @click:append-inner="passType = !passType" clearable
                    id="password" />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn size="large" color="secondary" rounded="lg" block variant="flat" class="text-capitalize"
                  @click="doLogin" id="btn-login">
                  Masuk&nbsp;
                  <v-icon right class="i-mdi-login"></v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>