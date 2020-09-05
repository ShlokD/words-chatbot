const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");

const app = express();
const core = require("./app/core");
const createLogger = require("./logger").createLogger

const start = () => {
  const logger = createLogger();
  const matcher = core.createMatcher();

  app.use(bodyParser.json());
  app.use(express.static("client/ui"));

  app.post("/get-words", (req, res) => {
    const sentence = req.body.sentence;
    if (sentence) {
      const matches = matcher.calculateMatches(sentence);
      res.json({ matches });
    } else {
      res.json({ message: "Please provide a sentence" });
    }
  });

  app.listen(5050, () => {
    logger.info("Server started at 5050");
  });
};

start();
