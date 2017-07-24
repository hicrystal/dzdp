'use strict';
var serve = require('koa-static');
var koa = require('koa');
var app = koa();
var port = 3000;

//app.use(koa.static(__dirname + '/public'));
app.use(serve('.'),function *(next) {
    this.body = 'hello koa !'});

app.listen(port, function(){
    console.log( 'Koa 启动成功 http://localhost:' + port + '; press Ctrl-C to terminate.' );
});