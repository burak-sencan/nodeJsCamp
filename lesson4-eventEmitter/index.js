/*events modulu bir class gönderir bu classı EvenetEmitter'a alalım
ve bu classtan bir myEmitter nesnesi oluşturalim */

const EventEmitter = require("events");
const logEvents = require("./logEvents");

class MyEmitter extends EventEmitter {}

//initialize object
const myEmitter = new MyEmitter();

/*loglama oldugunda kendi yazdıgımız logEvents modulunu çalıstıracak
listeneri oluşturalım.
*/
myEmitter.on("log", (message) => {
  logEvents(message);
});

/*eventi tetiklemek için myEmitter.emit kullanılır. Dosyaya yazılmasını
daha iyi gözlemlemek için setTimeout ile 1sn sonra yazılmasını sağlayalım 
*/
setTimeout(() => {
  myEmitter.emit("log", "log event emitted");
}, 1000);
