"use strict"

exports.pathHandler = (server) => {

    /* Handle request with not existing path */
    server.register((instance, options, next) => {
        instance.setNotFoundHandler((req, reply) => {
            reply.sendFile("404.html")
        })
        next()
    })

    /* Root path */
    server.get("/", (req, reply) => {
        reply.sendFile("index.html")
    })

    /* Version confirmation */
    server.get("/versions", { websocket: true }, (conn, req) => {
        conn.socket.onmessage = (message) => {
            let versions = {
                node: process.versions["node"],
                fastify: server.version
            }
            conn.socket.send(JSON.stringify(versions))
        }
    })

}