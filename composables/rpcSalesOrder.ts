// Naming convention, all rpc request use 'r' prefix camelCase
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { SalesOrderClient } from "~/protob-gen/salesorder.client"

export default function () {
  const config = useRuntimeConfig()
  const apiURL = config.public.apiBase
  const _transport = new GrpcWebFetchTransport({
    baseUrl: apiURL,
    format: 'text'
  })

  const rGetPricelist = (async (enId?: number) => {
    try {
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'text'
      })
      const salesorder = new SalesOrderClient(_transport)
      const { response } = await salesorder.getPricelist({ enId })
      return Promise.resolve(response.data)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  const rGetPricelistDetail = (async (payload: {
    piOid: string, enId: number, paymentType: number, areaId: number
  }) => {
    try {
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'text'
      })
      const salesorder = new SalesOrderClient(_transport)
      const { response } = await salesorder.getPricelistDetail({
        piOid: payload.piOid,
        enId: payload.enId,
        paymentType: payload.paymentType,
        areaId: payload.areaId
      })
      return Promise.resolve(response.data)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  interface SalesOrder {
    soEnId: number,
    soPtnrIdBill: number,
    soDate: string,
    soAddBy: string,
    soPiId: number,
    soDiscHeader: number,
    soTotal: number
  }

  interface SoItems {
    sodPtId: number,
    sodQty: number,
    sodPrice: number,
    sodDisc: number
  }

  const rNewOrder = (async (payload: { salesOrder: SalesOrder, salesOrderDetail: SoItems[] }) => {
    try {
      console.log('request new order:', payload)
      const salesorder = new SalesOrderClient(_transport)
      const { response } = await salesorder.newOrder(payload)
      return Promise.resolve(response)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  return { rGetPricelist, rGetPricelistDetail, rNewOrder }
} 