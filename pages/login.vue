<script setup>
definePageMeta({
  layout: ''
})
const passType = ref(false)
const loginF = ref()
</script>

<template>
  <v-app>
    <v-main style="background-color: #6E2D30;">
      <v-container class="fill-height">
        <v-row>
          <v-col cols="12" md="4" offset-md="4">
            <v-card variant="tonal" color="secondary" class="pt-10 pb-5" rounded="xl">
              <v-card-title class="text-center">Sentral Kitchen</v-card-title>
              <v-card-text class="pt-10">
                <v-form ref="loginF" lazy-validation>
                  <v-text-field :rules="[v => !!v || 'item required']" variant="underlined" rounded="lg" label="No WA*"
                    clearable type="number" />
                  <v-text-field :rules="[v => !!v || 'item required']" rounded="lg" variant="underlined"
                    label="Password*" :append-inner-icon="passType ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passType ? 'password' : 'text'" @click:append-inner="passType = !passType" clearable />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn size="large" color="secondary" rounded="lg" block variant="flat" class="text-capitalize">
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