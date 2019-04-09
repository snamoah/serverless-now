const { expect } = require("chai");
const { createHandler } = require("./index");

describe("Handler", () => {
  describe("createHandler()", () => {
    it("should be a function", () => {
      expect(createHandler).to.be.a("function");
    });

    it("should return a Promise", () => {
      expect(createHandler({})).to.be.a("Promise");
    });

    describe("Lambda-invoked event", () => {
      let event = {
        requestContext: {},
        body: JSON.stringify({ foo: "bar" })
      };

      let action = event => ({ body: JSON.stringify(event) });

      it("should return stringified body", () => {
        return expect(createHandler({ action })(event)).to.eql({
          body: JSON.stringify(event)
        });
      });
    });
  });
});
