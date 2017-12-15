/**
 * Created by Rui on 15/12/17.
 */
const name = 'vue-training-node'

const port = process.env.PORT || 8082

// create server
const restify = require('restify')

const server = restify.createServer({name})

// register pluginsnpm
server.use(restify.queryParser())
server.use(restify.CORS({
  //credentials: true,                 // defaults to false
  origins: ['*'],
  methods: ['GET','POST','OPTIONS']
}))

server.use(restify.bodyParser({mapParams: false, defer: true}))
server.use(restify.authorizationParser())
// add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
// enable preflight (for chrome)
const preflightEnabler = require('se7ensky-restify-preflight')
preflightEnabler(server, {'headers': 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type'})

// ===============================
// register routers
require('./app/routes').forEach(router => router({server}))

// server.server.setTimeout(60000*5)

// ===============================
// start server
server.listen(port, host, () => {
    console.log(`${server.name} is listening at ${server.url}`)
})