// INSTRUCTIONS: In order to get Hot Reload started, go to: localhost:3001/webpack-dev-server
// localhost:3000 is still reserved for ExpressJS (set up for production)s
// const Router = require('koa-router');
// const router = new Router();
'use strict'

var multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

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

router
	.get('/api', function*(){
		this.body = yield render(__dirname + '/public/index2.html')
	})
	.get('/panda', function*(){
		this.body = yield render(__dirname + '/public/index.html')
	})
	.post('/upload-single', upload.single('filename'), function(req,res,next){ 
		// var file=req.file; 
		// // console.log("名稱︰%s",file.originalname); 
		// // console.log("mime︰%s",file.mimetype); 
		// //以下代碼得到檔案後綴 name=file.originalname; 
		// nameArray=name.split(''); 
		// var nameMime=[]; 
		// l=nameArray.pop(); 
		// nameMime.unshift(l); 
		// while(nameArray.length!=0&&l!='.'){ 
		// 	l=nameArray.pop(); nameMime.unshift(l); 
		// } 
		// //Mime是檔案的後綴 Mime=nameMime.join(''); 
		// console.log(Mime); res.send("done"); 
		// //重命名檔案 加上檔案後綴 
		// fs.renameSync('./upload/'+file.filename,'./upload/'+file.filename+Mime); 
		console.log(123);
	})

app
.use(router.routes())
// .use(router.allowedMethods())
// .listen(3000, ()=> console.log('port:'+3000));



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
}).listen(3001, '0.0.0.0', function (err, result) {
   if (err) {
     console.log(err);
   }
   console.log('Webpack Dev Server (Hot-Reload) listening on port 3001');
})

