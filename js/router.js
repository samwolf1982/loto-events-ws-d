'use strict'

const RandomString = require('./actions/randomString') // Подключаем экшен
const Shit = require('./actions/shit')
const errors = require('./errors')

module.exports = class Router {
  
  constructor() {
    this.randomString = new RandomString()
    this.shit = new Shit()
  }
  
  parseRequest(str) {
    let data = false
    try {
      data = JSON.parse(str)
    } catch(e) {
      return false
    }
    return data
  }
  
  go(req, ws, msg) {
    let data = this.parseRequest(msg) // Вдруг прилетел неправильный json
    if( data ) {
      switch( data.get ) { 
      case 'randomString': // Смотрим, есть ли у нас экшен
        this.randomString.response(ws, data)
        break
      
      case 'shit': // Смотрим, есть ли у нас экшен
        this.shit.response(ws, data)
        break
      
      default: // Либо отдаём 404
        ws.send( JSON.stringify(errors['404']) )
        break
      }
    } else 
      ws.send( JSON.stringify(errors['400']) )    
  }
  
}
