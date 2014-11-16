var assert = require('assert')
var fs = require('graceful-fs')
var path = require('path')
var fse = require('../../')
var testutil = require('testutil')

var TEST_DIR = ''

var ps = []
for (var i = 0; i < 25; i++) {
  var dir = Math.floor(Math.random() * Math.pow(16,4)).toString(16)
  ps.push(dir)
}

var file = ps.join('/')

describe('mkdirp / chmod', function() {
  beforeEach(function() {
    TEST_DIR = testutil.createTestDir('fs-extra')
    file = path.join(TEST_DIR, file)
  })

  afterEach(function(done) {
    fse.remove(TEST_DIR, done)
  })

  it('chmod-pre', function (done) {
    var mode = 0744
    fse.mkdirp(file, mode, function (er) {
      assert.ifError(er, 'should not error')
      fs.stat(file, function (er, stat) {
        assert.ifError(er, 'should exist')
        assert.ok(stat && stat.isDirectory(), 'should be directory')
        assert.equal(stat && stat.mode & 0777, mode, 'should be 0744')
        done()
      })
    })
  })

  it('chmod', function (done) {
    var mode = 0755
    fse.mkdirp(file, mode, function (er) {
      assert.ifError(er, 'should not error')
      fs.stat(file, function (er, stat) {
        assert.ifError(er, 'should exist')
        assert.ok(stat && stat.isDirectory(), 'should be directory')
        done()
      })
    })
  })
})

