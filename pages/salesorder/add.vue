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

const shoppingCart = ref([])

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
      shoppingCart.value = pricelistDetail.value.map(v => ({ ...v, qty: null, total: null }))
      $bus.$emit('waitDialog', false)
    }
  } catch (error) {
    $bus.$emit('waitDialog', false)
  }
}, 1000, { leading: true, trailing: false })

const total = $debounce(async (data) => {
  data.total = parseInt(data.qty) * data.price
}, 500, { leading: false, trailing: true })

const headers = [
  { title: 'Item', align: 'start', key: 'title', width: '*' },
  { title: 'Harga', align: 'end', key: 'price', width: '20%' },
  { title: 'Qty', align: 'end', key: 'qty', width: '10%' },
  { title: 'Total', align: 'end', key: 'total', width: '30%' }
]
const search = ref()
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
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Search" v-model="search" />
            <v-data-table :headers="headers" :items="shoppingCart" :search="search" height="400" item-value="name"
              hide-default-footer>
              <template v-slot:item.price="{ item }">
                {{ toMoney(item.price) }}
              </template>
              <template v-slot:item.qty="{ item }">
                <v-text-field v-model="item.qty" class="text-right" variant="underlined" placeholder="0" type="number"
                  @input="total(item)" />
              </template>
              <template v-slot:item.total="{ item }">
                {{ toMoney(item.total) }}
              </template>
            </v-data-table>
            cart: {{ shoppingCart }}

            {{ payload }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>