var fs = require ('fs')
//const { callbackify } = require('util')
var dbPath = './db.json'

exports.find = function (callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
           return  callback(err)
        }
        callback(null,JSON.parse(data).comments)
    })
}

/* 添加保存学生 */
exports.save = function (comment , callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
           return  callback(err)
        }
        var comments = JSON.parse(data).comments
        //处理id问题
        comment.id = comments[comments.length - 1].id + 1
        //保存到数组中
        comments.push(comment)
        var fileData = JSON.stringify({
            comments:comments
        })
        fs.writeFile(dbPath,fileData,function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}

/* 删除学生 */
exports.deleteById = function (id,callback) {
    fs.readFile(dbPath,'utf8',function(err,data){
        if (err) {
           return  callback(err)
        }
        var comments = JSON.parse(data).comments
        
        //findIndex 方法专门根据条件查找元素的下表
        var deleteId = comments.findIndex(function (item) {
            return item.id ===parseInt(id)
        })

        //将学生根据下表从数组中删除相应的对象
        comments.splice(deleteId,1)

        //把对象数据转化为字符串
        var fileData = JSON.stringify({
            comments:comments
        })
        fs.writeFile(dbPath,fileData,function(err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}