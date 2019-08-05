'use strict'

const Router = require('../js/router')

describe('Router', function() {
  
  it('parseRequest', function(done) {
    const wrongData = 'ign98374g5yg'
    const rightData = JSON.stringify({
      get: 'randomString',
      length: 123
    })
    const router = new Router()
    
    if( router.parseRequest(rightData) && !router.parseRequest(wrongData) )
      done()
  })
  
  it('go', function(done) {
    const router = new Router()
    let wrongResult = false
    
    const wrongData = JSON.stringify({
      get: 'unknownAction',
      param: 123
    })
    const rightData = JSON.stringify({
      get: 'randomString',
      length: 10
    })
    
    const rightWs = {
      send: function (str) {
        let data = JSON.parse(str)
        if( (data.code == 200) && wrongResult )
          done()
      }
    }
    
    const wrongWs = {
      send: function (str) {
        let data = JSON.parse(str)
        if( data.code == 404 )
          wrongResult = true
        router.go({}, rightWs, rightData)
      }
    }
    
    router.go({}, wrongWs, wrongData)
  })
  
})
