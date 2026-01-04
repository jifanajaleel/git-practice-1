const pino = require("pino");
const pinoLogger = require("pino-http");
const { randomUUID } = require("node:crypto")
const logger = pinoLogger({
    logger: pino(),
    genReqId: function (req, res) {
        if (req.id) return req.id
        let id = req.get('X-Request-Id')
        if (id) return id
        id = randomUUID()
        res.setHeader("X-Request-Id", id)
        return id
    }
});

module.exports = logger;
