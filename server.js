"use strict"

/* Create server */
const server = require("fastify")()

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

/* Handle request to non-existing path */
const { pathHandler } = require("./src/js/pathHandler")
pathHandler(server)

/* Specify IP address and port where this server runs */
const serverIP = utils.getMyIpAddress() || utils.userConsoleQuery("IP address of this PC?")
const serverPort = process.env.NASCO_SERVER_PORT || utils.userConsoleQuery("Port?")
process.env.NASCO_SERVER_IP = serverIP
process.env.NASCO_SERVER_PORT = serverPort

/* Run the server */
server.listen(serverPort, serverIP, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
