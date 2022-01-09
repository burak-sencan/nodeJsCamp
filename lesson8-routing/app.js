/* 1) Bu derste router modülünü import edip app.js içindeki yönlendirmelerimizi
rooter klasörü oluşturup root.js modülümüze taşıyalım.
ayrıca views içindeki subdir içindeki viewsler içinde  bir router modülü yazalım

2) sonrasında basit bir  REST api yazalım bunun için data klasöründeki employee.json
kullanalım. önce router'i yazalım:
    app.use("/employees", require("./routes/api/employees"));
sonrasinda ./routes/api/employees.js modülünü oluşturalım.
bu modül basitçe data klasöründeki employee.json datası için
CRUD olaylarımızı yönetsin.

java springdeki gibi get post olaylarımızı daha rahat görmek için
"thunder client" eklentisini kuralım. ve ilk verilerimizi almak için
new request oluşturalım.
http://localhost:3000/employees 

post işlemleri için ise query body kısmında 
{"firstname":"burak","lastname":  "sencan" } gönderelim.
del,put, get/id içinde gerekli işlemleri yapalım
*/
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(logger);

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", require("./routes/root.js"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errHandler);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
