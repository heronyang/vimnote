const expect = require('chai').expect
const request = require('request')
const mocha = require('mocha')

mocha.describe('Server API Test', function () {
  mocha.it('Check health is okay', function (done) {
    // TODO: Use dotenv file instead.
    request('http://0.0.0.0:8888/health', function (error, response, body) {
      expect(error).to.be.null // eslint-disable-line no-unused-expressions
      expect(response.statusCode).to.equal(200)
      expect(body).to.equal('ok')
      done()
    })
  })
})
