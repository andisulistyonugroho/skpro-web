gen_proto_web:
	npx protoc	\
	--ts_out protob-gen	\
	--proto_path protob	\
	protob/*.proto
