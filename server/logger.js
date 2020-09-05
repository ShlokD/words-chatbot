const winston = require("winston");

const createLogger = () =>
  winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.File({ filename: "app.log" })],
  });

module.exports = { createLogger };
