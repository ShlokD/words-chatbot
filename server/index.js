const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const core = require("./app/core");
const start = () => {
  let matcher;

  app.use(bodyParser.json());

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
    matcher = core.createMatcher();
    console.log("Server started at 5050");
  });
};

start();
