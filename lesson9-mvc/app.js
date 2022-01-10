/*Daha öncden model view kısımlarını oluşturmustuk. Bu bölümde ise
controller kısmını oluşturalım. controllers\employeesController.js modülümüzü oluşturalım
routes\api\employees.js modülündeki yaptıgımız crud işlemlerini burdan taşıyıp controllerda geliştirelim.
ve routes\api\employees.js içinde controller'ı import edip burada kullanalım.

thunder client ile Crud fonksiyonlarımızı kontrol edelim.
*/
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvents");
const errHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const corsOptions = require('./config/corsOptions');


app.use(logger);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "/public")));

//Routes
app.use("/", require("./routes/root.js"));
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
