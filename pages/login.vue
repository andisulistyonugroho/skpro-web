<script setup>
definePageMeta({
  layout: ''
})
const passType = ref(false)
const loginF = ref()
</script>

<template>
  <v-container>
    <v-row style="height:100vh;">
      <v-col align-self="start" cols="12" md="4" offset-md="4">
        <div class="text-center ma-12">
          <h1>Central Kitchen</h1>
          <div class="text-caption">SSB</div>
        </div>
      </v-col>
      <v-col align-self="end" cols="12" md="4" offset-md="4" class="mb-3">
        <v-form ref="loginF" lazy-validation>
          <v-text-field :rules="[v => !!v || 'item required']" rounded="lg" variant="underlined" label="No WA*"
            clearable type="number" />
          <v-text-field :rules="[v => !!v || 'item required']" rounded="lg" variant="underlined" label="Password*"
            :append-inner-icon="passType ? 'mdi-eye-off' : 'mdi-eye'" :type="passType ? 'password' : 'text'"
            @click:append-inner="passType = !passType" clearable />
        </v-form>
        <v-btn size="large" rounded="lg" block variant="tonal" class="text-capitalize">
          Submit&nbsp;
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>