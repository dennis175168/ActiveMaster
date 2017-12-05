const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', con => {
  con.body = '852';
});

router.get('/aa', ctx => {
  ctx.body = 'aa';
});

// response
// app.use(ctx1 => {
//   ctx1.body = 'Hello Koa';
// });
// app.use(function *(){
//   this.body = '123';
// })

// app.use(route.get('/aa',function *(){
//   this.body = 'aa';
// }));

// app.use(route.get('/bb',function *(){
//   this.body = 'aa';
// }));




//app.listen(3000);

app
.use(router.routes())
.use(router.allowedMethods())
.listen(3000, ()=> console.log('port:'+3000));