import { PricelistDetail, PricelistType } from "~/protob-gen/salesorder"

export const useSalesOrderStore = defineStore('salesorder', () => {

  const pricelists = ref<PricelistType[]>([])
  const pricelistDetail = ref<PricelistDetail[]>([])

  const { rGetPricelist, rGetPricelistDetail } = rpcSalesOrder()

  const getPricelist = (async () => {
    const response = await rGetPricelist()
    if (!response) return Promise.reject()

    pricelists.value = response
  })

  const getPricelistDetail = (async (input: { piOid: string, enId: number, paymentType: number, areaId: number }) => {
    const response = await rGetPricelistDetail({ piOid: input.piOid, enId: input.enId, paymentType: input.paymentType, areaId: input.areaId })
    if (!response) return Promise.reject()

    pricelistDetail.value = response
  })

  return { pricelists, pricelistDetail, getPricelist, getPricelistDetail }
})