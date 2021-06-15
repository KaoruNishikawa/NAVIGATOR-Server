"use strict"

const os = require("os")

/**
 * Get the IP address of the PC this program is running on.
 * @param {Object} param - Configurations.
 * @param {string} IPv - The desired IP version for the IP address. ["IPv4"|"IPv6"]
 * @param {boolean} multiOk - If output as array is acceptable or not.
 * @returns {string} - The IP address.
 */
exports.getMyIpAddress = (param = {}) => {
    /* Parameters declaration */
    let IPv = param.IPv || "IPv4"
    /* Search for desired IP address */
    let ifaces = os.networkInterfaces()
    let possibleIPs = []
    for (let key in ifaces) {
        /* Extract names en*** or eth** */
        /* cf. https://www.freedesktop.org/wiki/Software/systemd/PredictableNetworkInterfaceNames/ */
        if (key[0] === "e") {
            for (let iface of ifaces[key]) {
                if (iface.family === IPv && !iface.internal) {
                    possibleIPs.push(iface.address)
                }
            }
        }
    }
    /* Return as an array if permitted */
    if (possibleIPs.length == 1) { return possibleIPs[0] }
    if (param.multiOk && possibleIPs.length != 1) { return possibleIPs }
    return
}

/**
 * Prompt user input and get the answer.
 * @param {string} query - Question sentence to show on console.
 * @returns {string} - User input.
 */
exports.userConsoleQuery = (query) => {
    const readlineSync = require("readline-sync")
    return readlineSync.question(query + "\n>>> ")
}