var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCss =  require ('gulp-clean-css');
const concat = require ('gulp-concat');
const uglify = require('gulp-uglify');
const themekit = require('@shopify/themekit');

//script paths
var jsFiles = 'scripts/**/*.js',
    Dest = './assets',
    cssFiles = './styles/*.scss';

    gulp.task('minifyJs', function() {
        console.log('++++++++++++++++++++++');
        console.log('Starting JS compiling..........');
        return gulp.src(jsFiles)
            .pipe(concat('main.js'))
            .pipe(gulp.dest(Dest))
            .pipe(uglify())
            .pipe(concat('main.js'))
            .pipe(gulp.dest(Dest))
            .on("end", () => {
                console.log("+++++++++++++++");
                console.log("main.js built!");
            });
    });
    gulp.task('minifyCss', function() {
        console.log('~~~~~~~~~~~~~~~~~~~~');
        console.log('Now compiling all CSS Files....... to terminate press Ctrl+C');
        console.log('Check CSS in assets folder - all done now');
        return gulp.src(cssFiles)
            .pipe(concat('main.css'))
            .pipe(gulp.dest(Dest))
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(minifyCss())
            .pipe(concat('main.css'))
            .pipe(gulp.dest(Dest))
            .on('error', function(error) {
              // we have an error
              done(error); 
            })
            .on("end", () => {
                console.log("+++++++++++++++");
                console.log("main.css built!");
              });
    });

    gulp.task(
        "build",
        gulp.parallel("minifyJs", "minifyCss")
      );
    
    
    //gulp.task('default', gulp.parallel('minifyJs', 'minifyCss'));
    
    //gulp.task('watch',function() {

      //  gulp.watch('./**/*.scss',gulp.parallel('minifyJs', 'minifyCss'))
        //themekit.command('watch', {
          //  allowLive: true,
            //env: 'development'
        //})
        
    //});
    
    gulp.task("default", () => {
        gulp.watch("./scripts/**/*.js", gulp.parallel("minifyJs"));
        gulp.watch("./styles/*.scss", gulp.parallel("minifyCss"));
        themekit.command('watch', {
            allowLive: true,
              env: 'development'
          })
      });