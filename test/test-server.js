var expect = require("chai").expect;
var request = require("request");
var mocha = require("mocha");

mocha.it("Check health is okay", function (done) {
  request("http://0.0.0.0:8080/", function (error, response, body) {
    expect(response.statusCode).to.equal(200);
    expect(body).to.equal("ok");
    done();
  });
});
