var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// 引入分类管理模块路由文件
var cateRouter = require('./routes/cate');
// 引入文章管理模块路由文件
var articleRouter = require('./routes/article');
// 引入博客信息管理模块路由文件
var InfoRouter = require('./routes/info');
// 引入管理员管理模块路由文件
var adminRouter = require('./routes/admin');
// 引入Token验证中间件
const verifyMiddleware = require('./routes/middleware/verify');

var app = express();


// app.set('views', path.join(__dirname, 'views'));

//用art-template引擎替换默认的jade引擎
//app.set(‘view engine’, ‘jade’);
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// 配置分类管理模块路由path，添加Token验证中间件
app.use('/cate', verifyMiddleware.verifyToken, cateRouter);
// 配置文章管理模块路由path，添加Token验证中间件
app.use('/article', verifyMiddleware.verifyToken, articleRouter);
// 配置博客信息管理模块路由path，添加Token验证中间件
app.use('/info', verifyMiddleware.verifyToken, InfoRouter);
// 配置管理员管理模块路由path，添加Token验证中间件
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log (err.message);

  // render the error page
  res.status(err.status || 500);
  res.json({
    code: err.status || 500
  });
});


module.exports = app;
