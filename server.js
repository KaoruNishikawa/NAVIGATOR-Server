"use strict"

/* Create server */
const server = require("fastify")({ logger: true })

/* Import dependencies */
const utils = require("./src/js/utils")
const CommandHandler = require("./src/js/commandHandler")
const pty = require("node-pty")
const os = require("os")

/* Register directory which contain html files */
/* Files in following directory can be accessed without directory name hereafter. */
const path = require("path")
const fastifyStatic = require("fastify-static")
server.register(fastifyStatic, {
    root: path.join(__dirname, "src", "static")
})

/* Enable server to use websocket */
server.register(require("fastify-websocket"))
let clients = new Set()
server.addHook("onRequest", (req, reply, done) => {
    let currentSize = clients.size
    clients.add(req.raw.socket._peername["address"] + ":" + req.raw.socket._peername["port"])
    console.log(clients)
    done()
})

/* Handle request to non-existing path */
const { pathHandler } = require("./src/js/clientHandler")
pathHandler(server)

/* Specify IP address and port where this server runs */
const serverIP = process.env.NAVIGATOR_SERVER_IP || utils.getMyIpAddress() || utils.userConsoleQuery("IP address of this PC?")
const serverPort = process.env.NAVIGATOR_SERVER_PORT || utils.userConsoleQuery("Port for this server?")
process.env.NAVIGATOR_SERVER_IP = serverIP
process.env.NAVIGATOR_SERVER_PORT = serverPort

/* Run the server */
server.listen(serverPort, serverIP, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
