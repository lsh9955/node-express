var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

var app = express();

// view engine 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// 404, 에러 핸들링
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // 개발 과정에서만 에러 제ㅐ공
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // 에러 페이지 랜더
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
