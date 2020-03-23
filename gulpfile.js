var gulp = require('gulp');
var sass = require('gulp-sass');
var soucemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function convert(done) {
    gulp.src('./scss/**/*.scss')
        .pipe(soucemaps.init())
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(soucemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
    done();
}
function Sync(done){
    browserSync.init({
        server:{
            baseDir: './'
        },
        port: 3000
    });
    done();
}

function browserReload(done){
    browserSync.reload();
    done();
}

function watchFiles(){
    gulp.watch("./scss/**/*", convert);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./**/*.js", browserReload);

}

// gulp.task(convert);
gulp.task('default', gulp.parallel(Sync, watchFiles));
