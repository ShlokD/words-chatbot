const { createMatcher } = require("../core");

describe("Module for calculating word matches", () => {
  let matcher;
  let actual;
  let expected;

  beforeAll(() => {
    matcher = createMatcher();
  });

  it("returns list of words for a query", () => {
    expected = [
      "quinze",
      "baccarat",
      "langteraloo",
      "spoilfive",
      "mum-chance",
      "suit",
      "high",
      "throw",
      "pack",
      "ombre",
      "deal",
    ];
    actual = matcher.calculateMatches("a game of cards");
    expect(actual).toEqual(expected);
  });
});
