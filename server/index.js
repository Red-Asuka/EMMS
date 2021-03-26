import Koa from 'koa'

import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import config from '../nuxt.config'

import sensor from './interface/sensor'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()

app.proxy = true
app.use(
  bodyParser({
    extendTypes: ['json', 'form', 'text'],
  })
)
app.use(json())

// Import and Set Nuxt.js options
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000,
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  // 监听所有路由
  app.use(sensor.routes()).use(sensor.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, (promise) => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  })
}

start()
