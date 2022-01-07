/**Request ve response süreci içerisinde belli işlemlerin sırayla yapılması istenebilir
  sürec içinde bir loglama sonrasında aut sonrasında ise yönlendirme
  yapılmak istenebilir.
   custom bir middleware yazalım.
   bu adımları middleware ile ayırabiliriz. middle1 çalıssın sonrasında 
   next() ile middle2'ye geçmesi(çalıstırılması) sağlanır.
   app.use(req,res,next)=>{..... next()}  //middleware1 next() ile snoraki middle'a geçmesi sağlanır.
   app.use(req,res,next)=>{..... next()}  //middleware2
   app.use(req,res,next)=>{res.send(....) }  //middleware3
   
   3.middleware ile response gönderilir ve işlemler tamamlanır. 
 */
/*
  Bu bölümde ise custom middlewarelerimizi yazacagız.
  ilk olarak static dosyalarımızı(css,img.. serve edecek middleware),
  reqest-response sürecimizde loggler middleware
  devamında CORS işlemleri için middleware
  ensonda ise errorHandler middleware yazacagız.
 */
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

/*cross origin respurce sharing */
const cors = require("cors");

/*custom middleware logger
 requestin nerden geldiği => req.headers.origin
bu fonksiyonu logger modülümüze taşıyalım ve logger
sabitiyle import edip kullanalımç
*/
app.use(logger);

/*şimdi ise cors modulunü npm ile yükleyelim.
google.com açıp consolda
fetch("http://localhost:300") yazalım
*/
const whitelist = [
  "https://www.yoursite.com",
  "https://www.google.com/",
  "http://127.0.0.1:5000",
  "http://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("not allowed by CORS"));
      }
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//content-type
app.use(express.urlencoded({ extended: false }));

//build-in middleware for json
app.use(express.json());

/*önceki bölümde css ve resim dosyalarımızı
görememizin sebebi.
public klasörü oluşturalım ve içine css img data.txt dosyalarımızı
ekleyelim.
*/
//server static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  // res.sendFile("./views/index.html",{root:__dirname})
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

//
app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html");
});

app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("hello.html yüklenmeye calisildi");
    next();
  },
  (req, res) => {
    res.send("hello world");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("finished");
};
app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//error handler middleware
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
