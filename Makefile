all: build copy down

build:
	docker-compose up

copy:
	docker cp $$(docker-compose ps -q honoka):/usr/src/app/dist .

down:
	docker-compose down

.PHONY: all build copy down
