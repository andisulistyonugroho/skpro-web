<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, default: false }
})
const { $debounce } = useNuxtApp()
const { smAndDown } = useDisplay()
const { pricelistDetail } = storeToRefs(useSalesOrderStore())
const emit = defineEmits(['closeit', 'add2cart'])
interface PriceList {
  ptId: number,
  title: string,
  piddOid: string,
  price: number,
  discount: number,
  dp: number,
  minQty: number,
  areaId: number,
  unit: string
}
const selected = ref<PriceList>()
const qty = ref(0)
const theForm = ref()

const optPrice = {
  number: { locale: 'id' },
  onMaska: (detail: any) => {
    if (selected.value) {
      selected.value.price = parseFloat(detail.unmasked)
    }
  }
}
const optQty = {
  number: { locale: 'id' },
  onMaska: (detail: any) => {
    qty.value = parseInt(detail.unmasked)
  }
}
const optTotal = {
  number: { locale: 'id' }
}

const total = computed(() => {
  return selected.value ? qty.value * selected.value.price : 0
})

const add2Cart = $debounce(async () => {
  const validation = await theForm.value.validate()
  if (!validation.valid) {
    return true
  }

  const data = { ...selected.value, qty: qty.value, total: total.value }
  emit('add2cart', data)
  await theForm.value.reset()
  emit('closeit')
}, 1000, { leading: true, trailing: false })
</script>

<template>
  <v-dialog v-model="props.dialog" :width="!smAndDown ? '40%' : '100%'" :fullscreen="smAndDown">
    <v-card flat :rounded="smAndDown ? 0 : 'lg'">
      <v-toolbar dark color="primary">
        <v-btn icon="i-mdi-close" dark @click="emit('closeit')" id="btn-close" />
        <v-toolbar-title>Product detail</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="px-3 py-6">
        <v-form ref="theForm" lazy-validation>
          <v-row :no-gutters="!smAndDown">
            <v-col cols="12">
              <v-autocomplete v-model="selected" :rules="[(v: any) => !!v || 'Item required']" item-value="ptId"
                :items="pricelistDetail" label="Name" return-object :density="!smAndDown ? 'compact' : 'default'"
                id="product" autocomplete="off" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field label="Qty" :rules="[(v: string) => !!v || 'Item required']" v-maska="optQty"
                :density="!smAndDown ? 'compact' : 'default'" :suffix="selected ? selected.unit : 'pcs'" id="qty"
                autocomplete="off" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field :value="selected ? selected.price : 0" v-maska="optPrice" label="@Price" readonly
                :density="!smAndDown ? 'compact' : 'default'" prefix="Rp" :class="!smAndDown ? 'pl-2' : ''" />
            </v-col>
            <v-col cols="12">
              <v-text-field :value="total" label="Total" v-maska="optTotal" readonly density="compact" prefix="Rp" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="theForm.reset()">cancel</v-btn>
        <v-btn prepend-icon="i-mdi-cart-outline" variant="tonal" @click="add2Cart" id="btn-add">add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>