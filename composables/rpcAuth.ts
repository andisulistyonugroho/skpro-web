import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"
import { AuthenticatorClient } from "~/protob-gen/authenticator.client"
export default function () {
  const login = (async () => {
    try {


      console.log('login rpc auth')
      const apiURL = "http://localhost:4000"
      const _transport = new GrpcWebFetchTransport({
        baseUrl: apiURL,
        format: 'binary'
      })
      const authClient = new AuthenticatorClient(_transport)
      const { response } = await authClient.login({ username: 'asd', password: 'asdf' })
      console.log('DATA:', response)
    } catch (error) {
      alert(error)
    }
  })

  return { login }
} 