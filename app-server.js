// INSTRUCTIONS: In order to get Hot Reload started, go to: localhost:3001/webpack-dev-server
// localhost:3000 is still reserved for ExpressJS (set up for production)s

'use strict'
var koa = require('koa'),
	router = require('koa-router')(),
	serve = require('koa-static'),
	render = require('./renderfile.js'),
	port = 3000,
	webpack = require('webpack'),
	WebpackDevServer = require('webpack-dev-server'),
	config = require('./webpack.config.js'),
	app = koa()
	
// FILE SERVING
app.use(serve(__dirname + '/public'))
app.use(serve(__dirname + '/node_modules/bootstrap/dist'))

// XMLHTTPRequest CUSTOM MIDDLEWARE (gives err if header is not properly set)
app.use(function *(){
	this.set('Access-Control-Allow-Origin', '*')
})

// Router
router
	.get('/api', function*(){
		this.body = yield render(__dirname + '/public/index2.html')
	})
	.get('/panda', function*(){
		this.body = yield render(__dirname + '/public/index.html')
	})
	.get('/aa', function*(){
		this.body = 'aa';
	})

app.use(router.routes())

// SERVER
app.listen(3000, function(){
	console.log('ExpressJS listening on port ' + port)
})


// WEBPACK DEV SERVER
new WebpackDevServer(webpack(config), {
   hot: true,
   historyApiFallback: true,
   proxy: {
     "*": "http://localhost:3000"
   }
}).listen(3001, 'localhost', function (err, result) {
   if (err) {
     console.log(err);
   }
   console.log('Webpack Dev Server (Hot-Reload) listening on port 3001');
})

