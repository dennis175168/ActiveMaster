var webpack = require('webpack')

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:3001',
		'webpack/hot/only-dev-server',
		//'bootstrap-loader',
		'./app-client'
	],
	module: {
		loaders: [
			{
				
				exclude: /(node_modules|app-server.js)/,
				loaders: ['react-hot-loader', 'babel' ],
				
			},
			
		]
	},
	output: { 
		// filename: "public/bundle.js" 
		
		// Uncomment line above to pack to file and disable two lines below
		// That will stop the dev server. 
		// AT ALL TIMES YOU HAVE localhost:3000 by ExpressJS 
		
		path: '/',
		publicPath: '/'
	},
	plugins: [
	   new webpack.HotModuleReplacementPlugin(),
	   new webpack.NoErrorsPlugin()
	 ]
}