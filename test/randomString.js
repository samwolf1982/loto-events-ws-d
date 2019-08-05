'use strict'

const RandomString = require('../js/actions/randomString')

describe('action/randomString', function() {
  
  it('getRandomString', function(done) {
    const randomString = new RandomString()
    const result = randomString.getRandomString(10)
    if( result.length == 10 )
      done()    
  })
  
  it('response', function(done) {
    const randomString = new RandomString()
    let wrongResult = false
    
    const rightData = {
      get: 'randomString',
      length: 12
    }
    const wrongData = {
      get: 'randomString',
      asd: 12
    }
    
    const rightWs = {
      send: function (str) {
        let data = JSON.parse(str)
        if( (data.code == 200) && (data.data.length == 12) && (typeof(data.data) == 'string') && wrongResult )
          done()
      }
    }
    
    const wrongWs = {
      send: function (str) {
        let data = JSON.parse(str)
        if( data.code == 400 )
          wrongResult = true
        randomString.response(rightWs, rightData)
      }
    }
    
    randomString.response(wrongWs, wrongData)
  })
  
})
