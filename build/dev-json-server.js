//json-server 假数据
var jsonServer = require('json-server') //引入文件
var apiServer = jsonServer.create(); //创建服务器
var apiRouter = jsonServer.router('mock/db.json') //引入json 文件 ，这里的地址就是你json文件的地址
var middlewares = jsonServer.defaults(); //返回JSON服务器使用的中间件。
apiServer.use(middlewares)
apiServer.use('/mock',apiRouter)
apiServer.listen( 3003,function(){ //json服务器端口:3003
  console.log('JSON Server is running')  //json server成功运行会在git bash里面打印出'JSON Server is running'
})
