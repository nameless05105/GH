install:
	docker-compose build
	docker-compose create

start:
	docker-compose start mongopi
	docker-compose restart backend
	docker-compose restart dbmodule

stop:
	docker-compose start stop