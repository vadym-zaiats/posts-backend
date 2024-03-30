npm run dev (default port 8000) - start backend

npm run build - compile ts -> js

ts-node facker - create fake users with def pass q123456

npm run typeorm migration:run -- -d db/data-source.ts

npm run typeorm migration:revert -- -d db/data-source.ts

npm run dev (default port http://localhost:5173/) - start fontend

npm run dev
[nodemon] restarting due to changes...
[nodemon] starting `ts-node server.ts`
Server is running on port 8000
Error during database connection: Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: NO)
at Handshake.Sequence.\_packetToError (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/sequences/Sequence.js:47:14)
at Handshake.ErrorPacket (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/sequences/Handshake.js:123:18)
at Protocol.\_parsePacket (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Protocol.js:291:23)
at Parser.\_parsePacket (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Parser.js:433:10)
at Parser.write (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Parser.js:43:10)
at Protocol.write (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Protocol.js:38:16)
at Socket.<anonymous> (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/Connection.js:88:28)
at Socket.<anonymous> (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/Connection.js:526:10)
at Socket.emit (node:events:519:28)
at Socket.emit (node:domain:488:12)

---

at Protocol.\_enqueue (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Protocol.js:144:48)
at Protocol.handshake (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/protocol/Protocol.js:51:23)
at PoolConnection.connect (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/Connection.js:116:18)
at Pool.getConnection (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/mysql/lib/Pool.js:48:16)
at /Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/typeorm/src/driver/mysql/MysqlDriver.ts:1268:18
at new Promise (<anonymous>)
at MysqlDriver.createPool (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/typeorm/src/driver/mysql/MysqlDriver.ts:1265:16)
at MysqlDriver.connect (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/typeorm/src/driver/mysql/MysqlDriver.ts:400:36)
at DataSource.initialize (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/node_modules/src/data-source/DataSource.ts:253:27)
at Server.configureDbConnection (/Users/vadym/dev/danIt-node/HW-node/node-hw-15/server.ts:44:21) {
code: 'ER_ACCESS_DENIED_ERROR',
errno: 1045,
sqlMessage: "Access denied for user 'root'@'localhost' (using password: NO)",
sqlState: '28000',
fatal: true
}

npm run dev
[nodemon] restarting due to changes...
[nodemon] starting `ts-node server.ts`
Server is running on port 8000
Database connection established successfully.
