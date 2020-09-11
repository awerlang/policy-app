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

.PHONY: run
run:
	NODE_ENV=production node dist
