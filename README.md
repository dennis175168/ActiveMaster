# react-koa

## What is react-koa?
React-koa is a super slim app that uses KoaJS framework and it gets you started with all the good stuff in less than a minute - no fuss, no weird setup, no nonsense. 

Focus on what you really love - creating!

## Features
* {new in 1.0.0} React Hot Loader - Edit components in real time
* koa instead of Express - hello future
* koa-router handles routing
* koa-static handles serving
* React for front end with babel (ES6) 
* renderfile tool for rendering pure html (no templating)
* Bootstrap for making your new app look pretty
* Webpack to make everything beautifully packaged

NB: Use webpack.config.js to toggle between dev server (with hot reload) and bundling files for launching the app (notes in the file). 

## Installation notes
Install using npm:
    
    npm install react-koa

Just take out react-koa folder out of node-modules and rename it to whatever your app is going to be called.

## Important stuff
Once installed run npm start which will pack React code and start the server. Command npm pack will run webpack and nodemon, listening on port 3000.

**Use localhost:3001/webpack-dev-server to get hot reload, localhost:3000 is still reserved only for ExpressJS (production ready)**

Here's how routing and rendering works:

    router
        .get('/api', function*(){
            // This is where we use the custom renderfile.js as render function
            this.body = yield render (__dirname + '/public/filename.html')
        })
        .get('/path', function*(){ ... })


NB: index2.html is used just to test out routing. You can delete it or rename it.