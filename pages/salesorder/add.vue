<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { $dayjs, $debounce, $bus } = useNuxtApp()
const { smAndDown } = useDisplay()
const { user } = useAuthStore()
const { getCustomerOfEntity } = useCustomerStore()
const { customers } = storeToRefs(useCustomerStore())
const { getArea } = useAreaStore()
const { areas } = storeToRefs(useAreaStore())
const { getPricelist, getPricelistDetail, newOrder } = useSalesOrderStore()
const { pricelists } = storeToRefs(useSalesOrderStore())


await getCustomerOfEntity(user.enId)
await getArea()
await getPricelist()

const payload = ref({
  soDate: $dayjs().toDate(),
  soAddBy: user.profile.userName,
  enId: user.enId,
  ptnrIdBill: null,
  piId: null,
  areaId: null,
  soSalesPerson: 5101517,
  transRmks: null
})

const shoppingCart = ref<any>([])
const headers = [
  { title: 'Item', align: 'start', key: 'title', width: '*' },
  { title: 'Qty', align: 'end', key: 'qty', width: '10%' },
  { title: '@Price', align: 'end', key: 'price', width: '20%' },
  { title: 'Total', align: 'end', key: 'total', width: '30%' }
] as const
const search = ref()
const productD = ref(false)
const tab = ref(2)
const theForm = ref()

const piOid = computed(() => {
  if (!payload.value.piId && pricelists.value) return ''

  const found = pricelists.value.find(obj => obj.piId === payload.value.piId)
  return found ? found.piOid : ''
})

const subTotal = computed(() => {
  let total = 0
  let row = <any>[]
  for (row of shoppingCart.value) {
    total += row.total
  }
  return total
})

const vat = computed(() => {
  return subTotal.value * (11 / 100)
})

const total = computed(() => {
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
  data.item.total = parseInt(data.value) * data.item.price
  data.item.qty = data.value
}, 500, { leading: false, trailing: true })

const openDProduct = $debounce(async () => {
  if (!payload.value.piId || !payload.value.areaId || !payload.value.ptnrIdBill) {
    $bus.$emit('waitDialog', false)
    const error = new Error('Choose Customer, Pricelist and Area first')
    $bus.$emit('errorSnack', error)
    return
  }

  await doGetProduct()
  productD.value = true
}, 1000, { leading: true, trailing: false })

const add2Cart = ((data: any) => {
  const found: any = shoppingCart.value.find((obj: any) => obj.ptId === data.ptId)
  if (found) {
    found.qty += data.qty
    found.total += data.total
  } else {
    shoppingCart.value.push(data)
  }
})

const removeCartItem = ((id: number) => {
  shoppingCart.value.splice(id, 1)
})

const doSubmit = $debounce(async () => {
  try {
    $bus.$emit('waitDialog', true)
    console.log('do submit')
    const soDetail = shoppingCart.value.map((obj: any) => {
      return {
        sodPtId: obj.ptId,
        sodQty: obj.qty,
        sodPrice: obj.price,
        sodDisc: 0
      }
    })
    console.log('so details: ', soDetail)
    await newOrder({
      salesOrder: {
        soDomId: 1,
        soEnId: payload.value.enId,
        soAddBy: payload.value.soAddBy,
        soPtnrIdSold: payload.value.ptnrIdBill,
        soDate: payload.value.soDate,
        soSalesPerson: payload.value.soSalesPerson,
        soPiId: payload.value.piId,
        soPayType: 9942,//credit
        soPayMethod: 99290,//cash in hand
        soDiscHeader: 0,
        soTotal: total.value,
        soTransRmks: payload.value.transRmks
      },
      salesOrderDetail: soDetail
    })
    $bus.$emit('waitDialog', false)
    $bus.$emit('okSnack', { color: 'green', message: 'Berhasil disimpan' })
    shoppingCart.value = []; theForm.value.reset()
  } catch (error) {
    $bus.$emit('waitDialog', false)
    if (error instanceof Error) {
      $bus.$emit('errorSnack', error)
    }
  }
}, 1000, { leading: true, trailing: false })

</script>
<template>
  <v-tabs v-model="tab" align-tabs="start" color="primary" class="mb-3">
    <v-tab :value="1" to="/salesorder">List</v-tab>
    <v-tab :value="2" to="/salesorder/add">Add</v-tab>
  </v-tabs>
  <v-container fluid>
    <v-form ref="theForm">
      <v-row no-gutters>
        <v-col cols="12" md="4">
          <v-autocomplete v-model="payload.ptnrIdBill" :items="customers" item-value="ptnrId" item-title="ptnrName"
            label="Customer" density="compact" :rules="[(v: number) => !!v || 'Item required']"
            :class="!smAndDown ? 'pr-2' : ''" id="customer">
            <template v-slot:item="{ props, item }">
              <v-list-item v-bind="props" :subtitle="item.raw.ptnrId" />
            </template>
            <template v-slot:selection="{ item, index }">
              {{ item.title }} - {{ item.value }}
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete v-model="payload.piId" item-value="piId" item-title="piDesc" :items="pricelists"
            label="Pricelist" :rules="[(v: number) => !!v || 'Item required']" density="compact"
            :class="!smAndDown ? 'pr-2' : ''" id="pl" />
        </v-col>
        <v-col cols="12" md="2">
          <v-autocomplete v-model="payload.areaId" item-value="areaId" item-title="areaName" :items="areas" label="Area"
            :rules="[(v: string) => !!v || 'Item required']" density="compact" id="area" />
        </v-col>
        <v-col cols="12" md="2">
          <v-date-input v-model="payload.soDate" prepend-icon="" density="compact" label="Transaction date"
            :rules="[(v: string) => !!v || 'Item required']" :class="!smAndDown ? 'pl-2' : ''" />
        </v-col>
        <v-col cols="12">
          <v-btn :block="smAndDown" :density="smAndDown ? 'default' : 'compact'" class="text-capitalize" variant="tonal"
            @click="openDProduct" id="btn-choose-product">choose
            product</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-sheet rounded class="mt-5 border">
      <v-data-table density="compact" :headers="headers" :items="shoppingCart" :search="search" item-value="name"
        hide-default-footer>
        <template v-slot:item.title="row">
          <v-btn color="red" variant="plain" icon="i-mdi-close-circle" size="default"
            @click="removeCartItem(row.index)" />
          {{ row.value }}
        </template>
        <template v-slot:item.price="row">
          {{ toMoney(row.value) }}
        </template>
        <template v-slot:item.qty="row">
          <div class="d-flex">
            <input type="number" v-model="row.value" @input="calcTotal(row)" class="text-right border-solid" min="1">
            <span class="pl-1">{{ Object(row.item).unit }}</span>
          </div>
        </template>
        <template v-slot:item.total="row">
          {{ toMoney(row.value) }}
        </template>
      </v-data-table>
    </v-sheet>
    <v-row :no-gutters="!smAndDown">
      <v-col cols="12" md="6">
        <v-textarea v-model="payload.transRmks" variant="outlined" label="Order Notes" class="mt-5 rounded-lg" rows="3"
          counter :rules="[(v: string) => v && v.length <= 300 || 'Max 300 characters']" />
      </v-col>
      <v-col cols="12" md="6">
        <v-sheet rounded :class="smAndDown ? 'mt-5 pa-3 border' : 'ml-3 mt-5 pa-3 border'">
          <v-row no-gutters>
            <v-col cols="3" class="text-right">
              <label>Sub Total</label>
              <div>Rp <span id="subtotal">{{ toMoney(subTotal) }}</span></div>
            </v-col>
            <v-col cols="3" class="text-right">
              <label>VAT (11%)</label>
              <div>Rp <span id="vat">{{ toMoney(vat) }}</span></div>
            </v-col>
            <v-col cols="3" class="text-right">

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
      <v-btn class="mr-3" variant="outlined" @click="shoppingCart = []; theForm.reset()">cancel</v-btn>
      <v-btn id="btn-submit" @click="doSubmit">submit</v-btn>
    </div>
  </v-container>
  <LazyOrdersProductSelection :dialog="productD" @closeit="productD = false" @add2cart="add2Cart" />
</template>