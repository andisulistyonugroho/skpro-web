// Naming convention, all rpc request use 'r' prefix camelCase
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { AreaClient } from "~/protob-gen/area.client"

export default function () {
  const config = useRuntimeConfig()
  const rGetArea = (async (areaId?: number) => {
    try {
      const apiURL = config.public.apiBase
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'text'
      })
      const area = new AreaClient(_transport)
      const { response } = await area.availableArea({ areaId })
      return Promise.resolve(response.data)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  return { rGetArea }
} 