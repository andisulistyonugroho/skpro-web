// Naming convention, all rpc request use 'r' prefix camelCase
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { CustomerClient } from "~/protob-gen/customer.client"
export default function () {
  const rGetCustomerOfEntity = (async (enId: number) => {
    try {
      console.log('get customer rpc enid:', enId)
      const apiURL = "http://localhost:4000"
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'text'
      })
      const custClient = new CustomerClient(_transport)
      const { response } = await custClient.customerOfEntity({ enId: enId, active: 'Y' })
      return Promise.resolve(response.data)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  return { rGetCustomerOfEntity }
} 