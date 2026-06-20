//Collect system information


const os = require("os");

function getSystemInfo() {
    return {
        operatingSystem: os.type() || "Not Available",
        cpuArchitecture: os.arch() || "Not Available",
        hostname: os.hostname() || "Not Available",
        nodeVersion: process.version || "Not Available",
        platform: os.platform() || "Not Available",
        homeDirectory: os.homedir() || "Not Available",
        totalMemory:
            `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        freeMemory:
            `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
        cpuCount:
            os.cpus().length
    };
}

module.exports = getSystemInfo;