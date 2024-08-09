import * as jspb from 'google-protobuf'



export class CreateRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): CreateRequest;

  getPassword(): string;
  setPassword(value: string): CreateRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateRequest): CreateRequest.AsObject;
  static serializeBinaryToWriter(message: CreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateRequest;
  static deserializeBinaryFromReader(message: CreateRequest, reader: jspb.BinaryReader): CreateRequest;
}

export namespace CreateRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class CreateResponse extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): CreateResponse;

  getUsername(): string;
  setUsername(value: string): CreateResponse;

  getToken(): string;
  setToken(value: string): CreateResponse;

  getGroupid(): number;
  setGroupid(value: number): CreateResponse;

  getUserptnrid(): number;
  setUserptnrid(value: number): CreateResponse;

  getUserpidgin(): string;
  setUserpidgin(value: string): CreateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateResponse): CreateResponse.AsObject;
  static serializeBinaryToWriter(message: CreateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateResponse;
  static deserializeBinaryFromReader(message: CreateResponse, reader: jspb.BinaryReader): CreateResponse;
}

export namespace CreateResponse {
  export type AsObject = {
    userid: number,
    username: string,
    token: string,
    groupid: number,
    userptnrid: number,
    userpidgin: string,
  }
}

export class LoginRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): LoginRequest;

  getPassword(): string;
  setPassword(value: string): LoginRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class LoginResponse extends jspb.Message {
  getUserid(): number;
  setUserid(value: number): LoginResponse;

  getUsername(): string;
  setUsername(value: string): LoginResponse;

  getToken(): string;
  setToken(value: string): LoginResponse;

  getGroupid(): number;
  setGroupid(value: number): LoginResponse;

  getUserptnrid(): number;
  setUserptnrid(value: number): LoginResponse;

  getUserpidgin(): string;
  setUserpidgin(value: string): LoginResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoginResponse): LoginResponse.AsObject;
  static serializeBinaryToWriter(message: LoginResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginResponse;
  static deserializeBinaryFromReader(message: LoginResponse, reader: jspb.BinaryReader): LoginResponse;
}

export namespace LoginResponse {
  export type AsObject = {
    userid: number,
    username: string,
    token: string,
    groupid: number,
    userptnrid: number,
    userpidgin: string,
  }
}

