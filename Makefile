lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-server:
	npx json-server ./server/database/seminars.json

deploy:
	git push heroku main

start:
	make start-server

develop:
	make start-server & make start-frontend

build:
	rm -rf frontend/dist
	npm run build