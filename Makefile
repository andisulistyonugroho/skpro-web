gen_proto_web:
	npx protoc	\
	--ts_out protob-gen	\
	--proto_path protob	\
	--ts_opt optimize_code_size	\
	protob/*.proto
