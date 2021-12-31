/* Özellik1 node server üzerinde çalısır.
    btowser üzerinde değil.
    terminalde node app ile app.js dosyasını 
    çalıstıralım. 
    node app veya node app.js
*/
//console.log("hello world")



/* özellik2 window objesi yerine global objesi 
    kullanılır */
//console.log(global)



/*ES6 importları yerine requare("")  kullanılır*/
// const os = require("os")
// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())



/*çalıstırılan dosyanın dir ve adı için */
// console.log(__dirname)
// console.log(__filename)



/*path modulu ile daha verimli kullanabilirsin  */
// const path = require("path")
// console.log(path.dirname(__dirname))
// console.log(path.dirname(__filename))
// console.log(path.basename(__dirname))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))
// // tüm özelliklerini bir obje içinde döndürür
// console.log(path.parse(__filename))



/*Custom module kullanımı */
// const math = require("./math");
// console.log(math.add(3, 2));
// console.log(math.sub(3, 2));
