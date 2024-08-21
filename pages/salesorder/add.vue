<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { $dayjs, $debounce, $bus } = useNuxtApp()
const { user } = useAuthStore()
const { getCustomerOfEntity } = useCustomerStore()
const { customers } = storeToRefs(useCustomerStore())
const { getArea } = useAreaStore()
const { areas } = storeToRefs(useAreaStore())
const { getPricelist, getPricelistDetail } = useSalesOrderStore()
const { pricelists, pricelistDetail } = storeToRefs(useSalesOrderStore())


await getCustomerOfEntity(user.enId)
await getArea()
await getPricelist()

const payload = ref({
  soDate: $dayjs().toDate(),
  enId: user.enId,
  ptnrId: null,
  piId: null,
  areaId: null
})

const piOid = computed(() => {
  if (!payload.value.piId && pricelists.value) return null

  const found = pricelists.value.find(obj => obj.piId === payload.value.piId)
  return found.piOid
})

const doGetProduct = $debounce(async () => {
  try {
    if (payload.value.piId && payload.value.areaId) {
      $bus.$emit('waitDialog', true)
      await getPricelistDetail({
        piOid: piOid.value,
        enId: payload.value.enId,
        paymentType: 9941,
        areaId: payload.value.areaId
      })
      $bus.$emit('waitDialog', false)
    }
  } catch (error) {
    $bus.$emit('waitDialog', false)
  }
}, 1000, { leading: true, trailing: false })

const headers = [
  { title: 'Boat Type', align: 'start', key: 'name' },
  { title: 'Speed (knots)', align: 'end', key: 'speed' },
  { title: 'Length (m)', align: 'end', key: 'length' },
  { title: 'Price ($)', align: 'end', key: 'price' },
  { title: 'Year', align: 'end', key: 'year' }
]
const search = ref()
const boats = [
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
            <v-autocomplete v-model="payload.piId" item-value="piId" item-title="piDesc" :items="pricelists"
              label="Pricelist" @update:model-value="doGetProduct" />
            <v-autocomplete v-model="payload.areaId" item-value="areaId" item-title="areaName" :items="areas"
              label="Area" @update:model-value="doGetProduct" />
          </v-col>
          {{ payload }}
        </v-row>
        <v-row>
          <v-col cols="12">
            {{ pricelistDetail }}
            <v-text-field label="Search" v-model="search" />
            <v-data-table :headers="headers" :items="boats" :search="search" height="400" item-value="name"
              hide-default-footer />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>