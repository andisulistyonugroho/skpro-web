import * as grpcWeb from 'grpc-web';

import * as protob_authenticator_pb from '../protob/authenticator_pb'; // proto import: "protob/authenticator.proto"


export class AuthenticatorClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: protob_authenticator_pb.CreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: protob_authenticator_pb.CreateResponse) => void
  ): grpcWeb.ClientReadableStream<protob_authenticator_pb.CreateResponse>;

  login(
    request: protob_authenticator_pb.LoginRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.RpcError,
               response: protob_authenticator_pb.LoginResponse) => void
  ): grpcWeb.ClientReadableStream<protob_authenticator_pb.LoginResponse>;

}

export class AuthenticatorPromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; });

  create(
    request: protob_authenticator_pb.CreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<protob_authenticator_pb.CreateResponse>;

  login(
    request: protob_authenticator_pb.LoginRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<protob_authenticator_pb.LoginResponse>;

}

