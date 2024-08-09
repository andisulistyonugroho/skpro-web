gen_proto_web:
	protoc -I=. \
	--js_out=import_style=commonjs:. \
	--grpc-web_out=import_style=commonjs+dts,mode=grpcweb:. \
	protob/authenticator.proto