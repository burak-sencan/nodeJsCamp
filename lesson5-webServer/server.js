const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;
const EventEmitter = require("events");
const logEvents = require("./logEvents");
const { endOfISOWeek } = require("date-fns");

class Emitter extends EventEmitter {}
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3000;
const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (error) {
    console.log(error);
    response.statusCode = 500;
    response.end();
  }
};
const server = http.createServer((req, res) => {

  console.log("req.url: ", req.url, "\t", "req.method: ", req.method);
  /* her url veya dosya için bu verimsiz if yöntemini veya switch-case
  yöntemini kullanmak yerine daha dinamik bir yapı olusturalım
*/
  /*
  let filePath;
  if (req.url === "/" || req.url === "index.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    filePath = path.join(__dirname, "views", "index.html");
    fs.readFile(filePath,"utf-8",(err,data)=>{
      res.end(data)
    })
  }*/

  const extention = path.extname(req.url);
  let contentType;

  switch (extention) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
      break;
  }
  /*
   */
  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html") //1.yol
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  //makes html extension not required in the browser
  if (!extention && req.url.slice(-1) !== "/") {
    filePath += ".html";
  }

  //serving file operation
  const fileExists = fs.readFileSync(filePath);
  if (fileExists) {
    //serve the file
    serveFile(filePath, contentType, res);
  } else {
    //404
    //301 redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { location: "/" });
        res.end();
      default:
        //serve a 404 response
        serveFile(path.join(__dirname,"views","404.html"), "text/html", res);

        break;
    }
  }
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

// myEmitter.on("log", (message) => {
//   logEvents(message);
// });

// myEmitter.emit("log", "log event emitted");
