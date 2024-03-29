npm run dev (default port 8000) - start backend

npm run build - compile ts -> js

ts-node facker - create fake users with def pass q123456

npm run typeorm migration:run -- -d db/data-source.ts

npm run typeorm migration:revert -- -d db/data-source.ts

npm run dev (default port http://localhost:5173/) - start fontend

Error during database connection: Error: connect ETIMEDOUT
at Connection.\_handleConnectTimeout (/var/task/node_modules/mysql/lib/Connection.js:409:13)
at Object.onceWrapper (node:events:631:28)
at Socket.emit (node:events:517:28)
at Socket.\_onTimeout (node:net:598:8)
at listOnTimeout (node:internal/timers:569:17)
at process.processTimers (node:internal/timers:512:7)
--------------------
at Protocol.\_enqueue (/var/task/node_modules/mysql/lib/protocol/Protocol.js:144:48)
at Protocol.handshake (/var/task/node_modules/mysql/lib/protocol/Protocol.js:51:23)
at PoolConnection.connect (/var/task/node_modules/mysql/lib/Connection.js:116:18)
at Pool.getConnection (/var/task/node_modules/mysql/lib/Pool.js:48:16)
at /var/task/node_modules/typeorm/driver/mysql/MysqlDriver.js:1012:18
at new Promise (<anonymous>)
at MysqlDriver.createPool (/var/task/node_modules/typeorm/driver/mysql/MysqlDriver.js:1009:16)
at MysqlDriver.connect (/var/task/node_modules/typeorm/driver/mysql/MysqlDriver.js:305:36)
at DataSource.initialize (/var/task/node_modules/typeorm/data-source/DataSource.js:136:27)
at Server.configureDbConnection (/var/task/dist/server.js:65:41) {
errorno: 'ETIMEDOUT',
code: 'ETIMEDOUT',
syscall: 'connect',
fatal: true
}
