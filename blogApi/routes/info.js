// 引入Express对象
var express = require ('express');
// 引入路由对象
var router = express.Router ();
// 引入我们自定义的controller
const InfoController = require('../controllers/info');
// 定义获取博客信息路由，GET请求
router.get ('/', InfoController.info);
// 定义修改博客信息路由，PUT请求
router.put ('/', InfoController.update);
// 导出路由，供app.js文件调用
module.exports = router;
