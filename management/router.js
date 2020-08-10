var fs = require("fs")
var Comment = require('./comment')
module.exports = function (app){
    //当服务器收到 get 请求 / 得时候，执行回调处理函数
    
app.get('/',function (req,res){
    res.render('sign_in.html')
})

app.get('/post',function (req,res) {
    
    Comment.find(function (err,comments){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('post.html',{
            comments:comments
        })
    })
})

//当以post请求/post的时候，执行指定的处理函数
//这样的话我们就可以利用不同的请求方法让同一个路径请求多次
app.post('/post',function(req,res){
    
    var comment=req.body
    Comment.save(comment,function(err){
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/post')
    })
    
})

//删除学生
app.get('/delete',function(req,res) {
    //1.获取要删除的id
    //2.执行删除操作
    //3.根据删除结果发送响应数据
    //console.log("delete "+req.query.id)
    Comment.deleteById(req.query.id,function(err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/post')
    })
})

}