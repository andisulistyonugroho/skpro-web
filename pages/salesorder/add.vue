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
const headers = [
  { title: 'Item', align: 'start', key: 'title', width: '*' },
  { title: 'Unit', align: 'end', key: 'unit', width: '5%' },
  { title: 'Price', align: 'end', key: 'price', width: '20%' },
  { title: 'Qty', align: 'end', key: 'qty', width: '10%' },
  { title: 'Total', align: 'end', key: 'total', width: '30%' }
]
const search = ref()
const productD = ref(false)

const piOid = computed(() => {
  if (!payload.value.piId && pricelists.value) return null

  const found = pricelists.value.find(obj => obj.piId === payload.value.piId)
  return found.piOid
})

const subTotal = computed(() => {
  return shoppingCart.value.reduce((prev, current) => {
    return prev + current.total
  }, 0)
})

const vat = computed(() => {
  return subTotal.value * (11 / 100)
})

const total = computed(() => {
  console.log(subTotal.value)
  return subTotal.value + vat.value
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

const calcTotal = $debounce(async (data) => {
  data.total = parseInt(data.qty) * data.price
}, 500, { leading: false, trailing: true })

const openDProduct = $debounce(async () => {
  if (!payload.value.piId || !payload.value.areaId || !payload.value.ptnrId) {
    $bus.$emit('waitDialog', false)
    const error = new Error('Choose Customer, Pricelist and Area first')
    $bus.$emit('errorSnack', error)
    return
  }

  await doGetProduct()
  productD.value = true
}, 1000, { leading: true, trailing: false })

const add2Cart = ((data) => {
  const found = shoppingCart.value.find(obj => obj.ptId === data.ptId)
  if (found) {
    found.qty += data.qty
    found.total += data.total
  } else {
    shoppingCart.value.push(data)
  }
})

</script>
<template>
  <v-container fluid>
    <h4 class="pb-3">New Order</h4>
    <v-row no-gutters>
      <v-col cols="4">
        <v-autocomplete v-model="payload.ptnrId" :items="customers" item-value="ptnrId" item-title="ptnrName"
          label="Customer" density="compact" :rules="[v => !!v || 'Item required']" class="pr-2" id="customer">
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.ptnrId" />
          </template>
          <template v-slot:selection="{ item, index }">
            {{ item.title }} - {{ item.value }}
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="4">
        <v-autocomplete v-model="payload.piId" item-value="piId" item-title="piDesc" :items="pricelists"
          label="Pricelist" density="compact" class="pr-2" id="pl" />
      </v-col>
      <v-col cols="2">
        <v-autocomplete v-model="payload.areaId" item-value="areaId" item-title="areaName" :items="areas" label="Area"
          density="compact" id="area" />
      </v-col>
      <v-col cols="2">
        <v-date-input v-model="payload.soDate" prepend-icon="" density="compact" label="Transaction date"
          class="pl-2" />
      </v-col>
      <v-col cols="12">
        <v-btn density="compact" class="text-capitalize" variant="tonal" @click="openDProduct"
          id="btn-choose-product">choose
          product</v-btn>
      </v-col>
    </v-row>
    <v-sheet rounded class="mt-5 border">
      <v-data-table density="compact" :headers="headers" :items="shoppingCart" :search="search" item-value="name"
        hide-default-footer>
        <template v-slot:item.price="{ item }">
          {{ toMoney(item.price) }}
        </template>
        <template v-slot:item.qty="{ item }">
          <input type="number" v-model="item.qty" @input="calcTotal(item)" class="text-right border-solid">
        </template>
        <template v-slot:item.total="{ item }">
          {{ toMoney(item.total) }}
        </template>
      </v-data-table>
    </v-sheet>
    <v-row no-gutters>
      <v-col cols="6">
        <v-textarea variant="outlined" label="Order Notes" class="mt-5 mr-3 rounded-lg" rows="3" counter
          :rules="[v => v && v.length <= 300 || 'Max 300 characters']" />
      </v-col>
      <v-col cols="6">
        <v-sheet rounded class="mt-5 pa-3 border">
          <v-row no-gutters>
            <v-col cols="3" class="text-right">
              <label>Sub Total</label>
              <div>Rp <span id="subtotal">{{ toMoney(subTotal) }}</span></div>
            </v-col>
            <v-col cols="3" class="text-right">
              <label>Discount</label>
              <div>Rp <span id="discount">0</span></div>
            </v-col>
            <v-col cols="3" class="text-right">
              <label>VAT (11%)</label>
              <div>Rp <span id="vat">{{ toMoney(vat) }}</span></div>
            </v-col>
            <v-col cols="3" class="text-right">
              <label>Total</label>
              <div>Rp <span id="total">{{ toMoney(total) }}</span></div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
    <div class="text-right mt-5">
      <v-btn class="mr-3" variant="outlined">cancel</v-btn>
      <v-btn>submit</v-btn>
    </div>
  </v-container>
  <LazyOrdersProductSelection :dialog="productD" @closeit="productD = false" @add2cart="add2Cart" />
</template>