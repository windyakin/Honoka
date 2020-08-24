all: image-build build copy down

image-build:
	docker build -t honoka-build -f Dockerfile .

build:
	docker run --name honoka-build honoka-build release

copy:
	docker cp honoka-build:/usr/src/app/dist .

down:
	docker rm honoka-build

.PHONY: all image-build build copy down
