const ws = new WebSocket(location.origin.replace(/^http/, "ws") + "/info")
ws.onopen = () => { ws.send("") }
ws.onmessage = (message) => {
    /* Display core package version */
    message = JSON.parse(message.data)
    for (const tool of ["node", "fastify"]) {
        let element = document.getElementById(`${tool}-version`)
        if (element) { element.innerText = message[tool] }
    }
    /* Display server address */
    element = document.getElementById("serverLocation")
    if (element) { element.innerText = location.origin }
}
