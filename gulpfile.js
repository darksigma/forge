var gulp       = require("gulp");
var browserify = require("gulp-browserify");
var stylus     = require("gulp-stylus");
var plumber    = require("gulp-plumber");
var nib        = require("nib");
var fs         = require("fs");
var path       = require("path");
var colors     = require("colors");
var notifier   = require("terminal-notifier");
var express    = require("express");
var reactify   = require("reactify");
var source     = require("vinyl-source-stream");
var extReplace = require("gulp-ext-replace");


var scriptPaths = ["./app/*.jsx", "./app/**/*.jsx", "./app/*.js", "./app/**/*.js"];
var stylePaths  = ["./app/*.styl", "./app/**/*.styl"];
var outPath     = "./build";
var publicPath  = "./";


var notifyError = function(title){
	return function(err){
		console.log(title);
		console.log(err.message.red);
		notifier(err.message, {title: title});
	};
};


gulp.task("build-scripts", function() {
  return gulp.src("./app/main.jsx")
  	.pipe(plumber())
  	.pipe(browserify({transform: [reactify]}))
  	.on("error", notifyError("Script Build Error"))
  	.pipe(extReplace(".js"))
  	.pipe(gulp.dest(outPath));
});


gulp.task("build-style", function() {
	return gulp.src("./app/main.styl")
		.pipe(plumber())
		.pipe(stylus({use: [nib()]}))
		.on("error", notifyError("Stylus Build Error"))
		.pipe(gulp.dest(outPath));
});


gulp.task("watch", function() {
	gulp.watch(scriptPaths, ["build-scripts"]);
	gulp.watch(stylePaths, ["build-style"]);
});


gulp.task("server", function() {
	var app = express();

	// Disable caching.
	app.use(function(req, res, next) {
	  req.headers['if-none-match'] = 'no-match-for-this';
	  next();
	});

	app.use(express.static(publicPath));

	var renderIndex = function(req, res) {
		fs.readFile(path.join(__dirname, "index.html"), "utf8", function(err, text){
			res.send(text);
		});
	}

	app.get("/", renderIndex);
	app.get("/:pageId", renderIndex);

	app.listen(8000);
});


gulp.task("build", ["build-scripts", "build-style"]);

gulp.task("default", ["build", "watch", "server"]);
