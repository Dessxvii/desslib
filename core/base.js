

const log = require('npmlog')
const fs = require('fs')
const fca = require('facebook-chat-api')
const express = require('express')
const app = express()

function keepAlive(bool = true, port = 9080, cb) {
  if (cb instanceof Function)
    switch (bool) {
      case true:
        app.set('views', 'web')
        app.get('/', (rq, rs, nxt) => {
          rs.render('index.html')
          nxt()
        })
        app.listen(port, (err) => {
          cb(err)
        })
        break
      case false:
        app = undefined
        break
      default:
        app = express()
    }
}

function init(ast = '', cb) {
  if (ast.length > 0 && ast !== undefined && cb instanceof Function) {
    fca({ appState: JSON.parse(fs.readFileSync(ast, 'utf-8')) }, (er, api) => {
      let ev = new Event(api)
      cb(er, ev)
    })
  } else {
    log.warn('Init:', 'please check your arguments ... there\'s an error')
  }
}



class Event {
  constructor(api) {
    this.api = api
  }
  when(ev = '', cb) {
    if (ev.length !== undefined && cb instanceof Function) {
      this.api.setOptions({
        listenEvents: true,
        selfListen: false,
        forceLogin: true,
        autoMarkRead: true,
        autoMarkDelivery: true
      })
      this.api.listenMqtt((er, message) => {
        let napi = new Api(this.api, message.threadID)
        switch (message.type) {
          case ev:
            cb(er, message, napi)
            break
          default:
            break
        }
      })
    } else {
      log.warn('WhenError', ' check arguments there\'s an error')
    }
  }
}
class Api {
  constructor(api, id) {
    this.api = api, this.id = id
  }
  reply(txt = '', id) {
    this.api.sendMessage(txt, this.id)
  }
}
module.exports= { keepAlive,init}
