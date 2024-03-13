//importando plugins instalados ao arquivo gulpfile.js
const gulp = require('gulp'); //Importando plugin global do gulp
const htmlmin = require('gulp-htmlmin');//htmlmin = minimizando o html
const sass = require('gulp-sass')(require('sass'));// gulp-sass = executar o sass com o gulp e sass =  converter scss em css
const sourcemaps = require('gulp-sourcemaps');//source-maps = o navegador rastrear as informações de estilo no arquivo scss e não no css

const uglify = require('gulp-uglify'); // uglify = minimizar arquivos JS
const obfuscate = require('gulp-obfuscate');//obfuscate = obscurecer o código
const imagemin = require('gulp-imagemin'); //imagemin = minimizar arquivos de imagem

//configurando a função compilaHtml
function compilaHtml(){
    return gulp.src ('index.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./build'))
}

//configurando a função compilaSass
function compilaSass() {
    return gulp.src ('./src/styles/main.scss') //return = a função não terá callback - gulp.src= vai executar a automatização do gulpfile no arquivo indicado pelo caminho
    .pipe(sourcemaps.init()) //.pipe = indica que será executada mais uma ação ao ser finalizada a anterior, sourcemaps.init = inicia o sourcemaps
    .pipe(sass({outputstyle: 'compressed'})) // a função sass irá complilar os arquivos scss em css de forma comprimida
    .pipe(sourcemaps.write('./maps')) // configurando o sourcemaps
    .pipe(gulp.dest('./build/styles'));// onde será salvo o arquivo depois de ser executada a automação do gulp file - neste caso converter scss em css - gulp pra executar o sass
}

//configurando função para minimizar arquivos JS
function comprimeJS (){
    return gulp.src('./src/scripts/*.js')//mesma coisa da função acima
    .pipe(uglify()) //função de comprimir o js
    .pipe(obfuscate())//obscurecendo o codigo
    .pipe(gulp.dest('./build/scripts')); // onde salvará os arquivos após fazer a função gulp - uglify
}

//configurando a função para comprimir imagens
function comprimeImg (){
    return gulp.src ('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

//executando as funções e colocando o watch em todos os arquivos HTML JS CSS images

exports.default = function(){
    gulp.watch('./src/index.html', {ignoreInitial: false}, gulp.series(compilaHtml)); 
    gulp.watch('./src/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass)); 
    gulp.watch('./src/scrips/*.js', {ignoreInitial: false}, gulp.series(comprimeJS)); 
    gulp.watch('./src/images/*', {ignoreInitial: false}, gulp.series(comprimeImg)); 
}
