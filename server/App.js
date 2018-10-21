import express from 'express'
import mongoose from 'mongoose'
import bunyan from 'bunyan'
import path from 'path'
import getMiddlewares from './middlewares'
import getModels from './models'
import getParsers from './parsers'
import getApi from './api'
import getFirebase from './firebase'


class App {
  constructor(params = {}) {
    Object.assign(this, params)
    this.log = this.getLogger()
    this.init()
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      level: 'trace'
    }, params))
  }

  getDataBase() {
    return {
      run: () => {
        new Promise(resolve => {
          mongoose.connect(this.config.atlas.url, { useNewUrlParser: true })
          resolve()
        })
      }
    }
  }

  getParsers() {
    return getParsers(this)
  }

  getModels() {
    return getModels(this)
  }

  getMiddlewares() {
    return getMiddlewares(this)
  }

  getFirebase() {
    return getFirebase(this)
  }

  init() {
    this.log.trace('App init')
    this.app = express()
    this.db = this.getDataBase()
    this.middlewares = getMiddlewares()
    this.log.trace('middlewares', Object.keys(this.middlewares))
    this.parsers = this.getParsers()
    this.log.trace('parsers', Object.keys(this.parsers))
    this.models = this.getModels()
    this.log.trace('models', Object.keys(this.models))
    this.firebase = this.getFirebase()
    this.log.trace('firebase', Object.keys(this.firebase))
 
    this.useMiddlewares()
    this.getRoutes()

    this.app.use(express.static('./client/build'))
    this.app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
    
  }

  useMiddlewares() {
    this.app.use(this.middlewares.reqParser),
    this.app.use(this.middlewares.compress)
  }

  getRoutes() {
    const api = getApi(this)
    this.app.use('/api/movies/all-movies', api.allMovies)
  }


  async run() {
    this.log.trace('App run')
    try {
      await this.db.run()
    } catch(err) {
      this.log.total(err)
    }
    
    return new Promise(resolve => {
      this.app.listen(this.config.port, () => {
        this.log.trace(`App "${this.config.name}" is working on port ${this.config.port}`)
        resolve(this)
      })
    })
  }
}

export default App



