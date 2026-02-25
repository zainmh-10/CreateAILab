.PHONY: setup dev build lint typecheck db seed

setup:
	npm install
	npm run db:generate

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

typecheck:
	npm run typecheck

db:
	npm run db:migrate

seed:
	npm run db:seed
