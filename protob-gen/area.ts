// @generated by protobuf-ts 2.9.4 with parameter optimize_code_size
// @generated from protobuf file "area.proto" (syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message aaRequest
 */
export interface aaRequest {
    /**
     * @generated from protobuf field: optional int32 area_id = 1;
     */
    areaId?: number;
}
/**
 * @generated from protobuf message aaResponse
 */
export interface aaResponse {
    /**
     * @generated from protobuf field: repeated AreaType data = 1;
     */
    data: AreaType[];
}
/**
 * @generated from protobuf message AreaType
 */
export interface AreaType {
    /**
     * @generated from protobuf field: int32 area_id = 1;
     */
    areaId: number;
    /**
     * @generated from protobuf field: string area_code = 2;
     */
    areaCode: string;
    /**
     * @generated from protobuf field: string area_name = 3;
     */
    areaName: string;
    /**
     * @generated from protobuf field: string area_active = 4;
     */
    areaActive: string;
    /**
     * @generated from protobuf field: int32 area_parent = 5;
     */
    areaParent: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class aaRequest$Type extends MessageType<aaRequest> {
    constructor() {
        super("aaRequest", [
            { no: 1, name: "area_id", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<aaRequest>): aaRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<aaRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: aaRequest): aaRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional int32 area_id */ 1:
                    message.areaId = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: aaRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional int32 area_id = 1; */
        if (message.areaId !== undefined)
            writer.tag(1, WireType.Varint).int32(message.areaId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message aaRequest
 */
export const aaRequest = new aaRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class aaResponse$Type extends MessageType<aaResponse> {
    constructor() {
        super("aaResponse", [
            { no: 1, name: "data", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => AreaType }
        ]);
    }
    create(value?: PartialMessage<aaResponse>): aaResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.data = [];
        if (value !== undefined)
            reflectionMergePartial<aaResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: aaResponse): aaResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated AreaType data */ 1:
                    message.data.push(AreaType.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: aaResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated AreaType data = 1; */
        for (let i = 0; i < message.data.length; i++)
            AreaType.internalBinaryWrite(message.data[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message aaResponse
 */
export const aaResponse = new aaResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AreaType$Type extends MessageType<AreaType> {
    constructor() {
        super("AreaType", [
            { no: 1, name: "area_id", kind: "scalar", T: 5 /*ScalarType.INT32*/ },
            { no: 2, name: "area_code", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "area_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "area_active", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 5, name: "area_parent", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<AreaType>): AreaType {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.areaId = 0;
        message.areaCode = "";
        message.areaName = "";
        message.areaActive = "";
        message.areaParent = 0;
        if (value !== undefined)
            reflectionMergePartial<AreaType>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AreaType): AreaType {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int32 area_id */ 1:
                    message.areaId = reader.int32();
                    break;
                case /* string area_code */ 2:
                    message.areaCode = reader.string();
                    break;
                case /* string area_name */ 3:
                    message.areaName = reader.string();
                    break;
                case /* string area_active */ 4:
                    message.areaActive = reader.string();
                    break;
                case /* int32 area_parent */ 5:
                    message.areaParent = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AreaType, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int32 area_id = 1; */
        if (message.areaId !== 0)
            writer.tag(1, WireType.Varint).int32(message.areaId);
        /* string area_code = 2; */
        if (message.areaCode !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.areaCode);
        /* string area_name = 3; */
        if (message.areaName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.areaName);
        /* string area_active = 4; */
        if (message.areaActive !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.areaActive);
        /* int32 area_parent = 5; */
        if (message.areaParent !== 0)
            writer.tag(5, WireType.Varint).int32(message.areaParent);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message AreaType
 */
export const AreaType = new AreaType$Type();
/**
 * @generated ServiceType for protobuf service Area
 */
export const Area = new ServiceType("Area", [
    { name: "AvailableArea", options: {}, I: aaRequest, O: aaResponse }
]);