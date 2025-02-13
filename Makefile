install:
	npm ci && make -C frontend install

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend

build:
	make -C frontend build

deploy:
	npm ci && cd ./frontend && npm ci && npm run build:deploy

freeport:
	sudo fuser -k 5001/tcp

lint-frontend:
	make -C frontend lint