all: build

build: src/* public/*
	sed -i "s|REPORT_URI_SUBDOMAIN_PLACEHOLDER|$(REPORT_URI_SUBDOMAIN)|" netlify.toml
	sed -i "s|REACT_APP_API_HOST_PLACEHOLDER|$(REACT_APP_API_HOST)|" netlify.toml
	sed -i "s|AS_PLACEHOLDER|$(AS)|" netlify.toml
	npm run build
	awk 'NR==FNR{key[NR]=$$1"_PLACEHOLDER";value[NR]=$$2;next}{for(i in key){gsub(key[i],substr(value[i], 1, length(value[i])-1))}print} ' FS='=' .env FS='' _headers > build/_headers

clean:
	rm -r build