//0.安装
 
//1.引包

var express = require('express')
var router = require('./router')

var bodyParser=require('body-parser')
//2.创建应用程序，相当于原来的http.creatServer
var app = express()

//公开指定目录
app.use('/public/',express.static('./public'))

//配置使用art-template 模板引擎
app.engine('html', require('express-art-template'))

//配置 body-parser 中间件(插件)
app.use(bodyParser.urlencoded({ extended: false }))
//parser application/json
app.use(bodyParser.json())
//挂载路由
router(app)

app.listen(3000,function() {
    console.log('running...')
})