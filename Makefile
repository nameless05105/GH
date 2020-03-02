install:
	docker-compose build
	docker-compose create
	docker-compose start rabbitmq-mqtt
	docker-compose start frontend
	docker-compose start backend
	docker-compose start dbmodule
	docker-compose start rdts-module
	docker-compose start ansm-module
	docker-compose start rabbitmq-mqtt

start:
	docker-compose start mongopi
	docker-compose restart backend
	docker-compose restart dbmodule

stop:
	docker-compose stop mongopi