DATABASE := policy

.PHONY: all
all: test

.PHONY: pod
pod:
	@podman pod create --name=postgres --publish 5432:80 || :

.PHONY: db
db: pod
	@podman run --pod postgres \
				--name postgres_test \
				--env POSTGRES_PASSWORD=pass \
				-d postgres || :

.PHONY: database
database: db
	@podman run --pod postgres --rm \
				--env POSTGRES_PASSWORD=pass \
				-v $$(pwd):/src \
				postgres bash -c 'createdb -h localhost -U postgres $(DATABASE) && psql -q -h localhost -U postgres -d $(DATABASE) -f /src/database.sql' || :

.PHONY: pgadmin
pgadmin: db 
	@podman run --pod=postgres -d \
				--name=pgadmin_test \
				--env PGADMIN_DEFAULT_EMAIL=user@domain.com \
				--env PGADMIN_DEFAULT_PASSWORD=SuperSecret \
				dpage/pgadmin4

.PHONY: test
test: database
	@podman run --pod=postgres --rm -it \
				--name=node_test \
				-v $$(pwd)/..:/src \
				-w /src \
				--env PG_CONN=postgres://postgres:pass@localhost:5432/policy \
				node:12 npx jest --watch --detectOpenHandles

.PHONY: clean
clean:
	@podman pod stop postgres
	@podman pod rm postgres
