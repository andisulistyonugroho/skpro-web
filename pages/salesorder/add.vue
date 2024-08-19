<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { $dayjs } = useNuxtApp()
const { user } = useAuthStore()
const { getCustomerOfEntity } = useCustomerStore()
const { customers } = storeToRefs(useCustomerStore())
const { getArea } = useAreaStore()
const { areas } = storeToRefs(useAreaStore())


await getCustomerOfEntity(user.enId)
console.log('abis await terbitlah:', customers)
await getArea()

const priceLists = ['HARGA JUAL OUTLET BYL CV.SOSIS']

const payload = ref({
  soDate: $dayjs().toDate(),
  ptnrId: null
})

const headers = [
  { title: 'Boat Type', align: 'start', key: 'name' },
  { title: 'Speed (knots)', align: 'end', key: 'speed' },
  { title: 'Length (m)', align: 'end', key: 'length' },
  { title: 'Price ($)', align: 'end', key: 'price' },
  { title: 'Year', align: 'end', key: 'year' }
]
const boats = [
  {
    name: 'Speedster',
    speed: 35,
    length: 22,
    price: 300000,
    year: 2021
  },
  {
    name: 'OceanMaster',
    speed: 25,
    length: 35,
    price: 500000,
    year: 2020
  },
  {
    name: 'Voyager',
    speed: 20,
    length: 45,
    price: 700000,
    year: 2019
  },
  {
    name: 'WaveRunner',
    speed: 40,
    length: 19,
    price: 250000,
    year: 2022
  },
  {
    name: 'SeaBreeze',
    speed: 28,
    length: 31,
    price: 450000,
    year: 2018
  },
  {
    name: 'HarborGuard',
    speed: 18,
    length: 50,
    price: 800000,
    year: 2017
  },
  {
    name: 'SlickFin',
    speed: 33,
    length: 24,
    price: 350000,
    year: 2021
  },
  {
    name: 'StormBreaker',
    speed: 22,
    length: 38,
    price: 600000,
    year: 2020,
  },
  {
    name: 'WindSail',
    speed: 15,
    length: 55,
    price: 900000,
    year: 2019,
  },
  {
    name: 'FastTide',
    speed: 37,
    length: 20,
    price: 280000,
    year: 2022,
  },
]
</script>
<template>
  <v-container fluid>
    <h4>Sales order baru</h4>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-date-input v-model="payload.soDate" prepend-icon="" label="Tanggal Transaksi" />
            <v-autocomplete v-model="payload.ptnrId" :items="customers" item-value="ptnrId" item-title="ptnrName"
              label="Customer">
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="item.raw.ptnrId" />
              </template>
              <template v-slot:selection="{ item, index }">
                {{ item.title }} - {{ item.value }}
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete item-value="areaId" item-title="areaName" :items="areas" label="Pricelist Area" />
            <v-autocomplete :items="priceLists" label="Pricelist" />
          </v-col>
          {{ payload }}
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table :headers="headers" :items="boats" height="400" item-value="name" hide-default-footer />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>