db_up:
	docker-compose -f docker-compose.db.yml up -d

all_up:
	docker-compose -f docker-compose.db.yml -f docker-compose.processes.yml up

db_stop:
	docker-compose -f docker-compose.db.yml stop

db_status:
	docker-compose -f docker-compose.db.yml ps

all_status:
	docker-compose -f docker-compose.db.yml -f docker-compose.processes.yml ps

front_clear_build:
	rm frontend/build/webpack_bundles/*
	rm frontend/dist/webpack_bundles/*
	npm install
