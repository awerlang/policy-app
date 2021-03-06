.PHONY: all
all: server client
	rsync -av ./server/package.json ./server/package-lock.json ./server/build/* ./client/dist/ ./dist --delete
	cd dist && npm install --production

.PHONY: server
server:
	cd server && npm run build

.PHONY: client
client:
	cd client && ng build --prod

.PHONY: start
start:
	cd server && npm start &
	cd client && npm start

.PHONY: test
test:
	@make --no-print-directory -C containers test 2>/dev/null

.PHONY: run
run:
	@make --no-print-directory -C containers run 2>/dev/null

.PHONY: clean
clean:
	@make --no-print-directory -C containers clean 2>/dev/null
