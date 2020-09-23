POD := policy-app
DATABASE := policy

.PHONY: all
all: test

.PHONY: pod
pod:
	@podman pod create --name=$(POD) --publish 5432:80 --publish 3000:3000 || :

.PHONY: db
db: pod
	@podman run --pod $(POD) -d \
				--name postgres \
				--env POSTGRES_PASSWORD=pass \
				postgres && sleep 6 || :

.PHONY: database
database: db
	@podman run --pod $(POD) --rm \
				--env POSTGRES_PASSWORD=pass \
				-v $$(pwd):/src \
				postgres bash -c 'createdb -h localhost -U postgres $(DATABASE) && psql -q -h localhost -U postgres -d $(DATABASE) -f /src/database.sql' || :

.PHONY: pgadmin
pgadmin: db 
	@podman run --pod $(POD) -d \
				--env PGADMIN_DEFAULT_EMAIL=user@domain.com \
				--env PGADMIN_DEFAULT_PASSWORD=SuperSecret \
				dpage/pgadmin4

.PHONY: test
test: database
	@podman run --pod $(POD) --rm -it \
				-v $$(pwd)/..:/src \
				-w /src \
				--env PG_CONN=postgres://postgres:pass@localhost:5432/policy \
				node:12 npx jest --watch --detectOpenHandles

.PHONY: run
run: database
	@podman run --pod $(POD) --rm -it \
				-v $$(pwd)/..:/src \
				-w /src \
				--env PG_CONN=postgres://postgres:pass@localhost:5432/policy \
				node:12 npm start

.PHONY: clean
clean:
	@podman pod stop policy-app
	@podman pod rm policy-app
