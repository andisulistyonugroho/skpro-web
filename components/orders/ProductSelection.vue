<script setup lang="ts">
const props = defineProps({
  dialog: { type: Boolean, default: false }
})
const { pricelistDetail } = storeToRefs(useSalesOrderStore())
const emit = defineEmits(['closeit'])
const selected = ref({
  ptId: 0,
  title: '',
  piddOid: '',
  price: 0,
  discount: 0,
  dp: 0,
  minQty: 0,
  areaId: 0,
  unit: ''
})
const qty = ref(0)

const optPrice = {
  number: { locale: 'id' },
  onMaska: (detail: any) => {
    selected.value.price = detail.unmasked
  }
}
const optQty = {
  number: { locale: 'id' },
  onMaska: (detail: any) => {
    qty.value = detail.unmasked
  }
}
const optTotal = {
  number: { locale: 'id' }
}

const total = computed(() => {
  return selected.value ? qty.value * selected.value.price : 0
})

watch(props, (val) => {
  if (val.dialog === true) {
    selected.value = {
      ptId: 0,
      title: '',
      piddOid: '',
      price: 0,
      discount: 0,
      dp: 0,
      minQty: 0,
      areaId: 0,
      unit: ''
    }
  }
})
</script>

<template>
  <v-dialog v-model="props.dialog" width="30%">
    <v-card flat>
      <v-toolbar dark color="primary">
        <v-btn icon="i-mdi-close" dark @click="emit('closeit')" />
        <v-toolbar-title>Rincian barang</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="px-3 py-6">
        <v-form ref="theForm" lazy-validation>
          <v-row no-gutters>
            <v-col cols="12">
              <v-autocomplete v-model="selected" :rules="[v => !!v || 'Item required']" item-value="ptId"
                :items="pricelistDetail" label="Nama barang" return-object density="compact" />
            </v-col>
            <v-col cols="7">
              <v-text-field :value="selected ? selected.price : 0" v-maska="optPrice" label="@Harga Jual" readonly
                density="compact" prefix="Rp" />
            </v-col>
            <v-col cols="5">
              <v-text-field :value="selected ? selected.discount : 0" label="@Diskon" readonly density="compact"
                prefix="Rp" class="pl-2" />
            </v-col>
            <v-col cols="3">
              <v-text-field label="Kuantiti" :rules="[v => !!v || 'Item required']" v-maska="optQty" density="compact"
                :suffix="selected ? selected.unit : 'pcs'" />
            </v-col>
            <v-col cols="9">
              <v-text-field :value="total" label="Total harga" v-maska="optTotal" readonly density="compact" prefix="Rp"
                class="pl-2" />
            </v-col>
            <v-col cols="12">
              <v-autocomplete label="Gudang" density="compact" />
              <v-autocomplete label="Nama Penjual" density="compact" />
            </v-col>
          </v-row>
        </v-form>
        {{ total }}
        {{ selected }}
      </v-card-text>
      <v-card-actions>
        <v-btn>batal</v-btn>
        <v-btn variant="tonal">simpan</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>