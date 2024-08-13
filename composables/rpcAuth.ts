// Naming convention, all rpc request use 'r' prefix camelCase
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { AuthenticatorClient } from "~/protob-gen/authenticator.client"
export default function () {
  const rLogin = (async (username: string, password: string) => {
    try {
      console.log('login rpc auth')
      const apiURL = "http://localhost:4000"
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'text'
      })
      const authClient = new AuthenticatorClient(_transport)
      const { response } = await authClient.login({ username: username, password: password })
      return Promise.resolve(response)
    } catch (error) {
      alert(error)
      console.log(error)
    }
  })

  return { rLogin }
} 