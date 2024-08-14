<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})
const { $dayjs } = useNuxtApp()
const { customers } = useCustomerStore()

const payload = ref({
  soDate: $dayjs().toDate()
})
</script>
<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Sales order baru</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-date-input v-model="payload.soDate" prepend-icon="" label="Tanggal Transaksi" />
            <v-autocomplete label="Customer"></v-autocomplete>
            <v-btn>asdf</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>