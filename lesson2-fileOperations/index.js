/*Dosya okuma. asyn olarak çalısır. */
// const fs = require("fs")
// fs.readFile("./files/starter.txt","utf8",(err,data) =>{
//   if(err) throw err;
//   console.log(data)
// })
// console.log("fs.read üste olmasına ragmen consola ilk ben geldim çünkü readfile asyn çalısıyor.")




/*Dosya işmi için Path modulu kullanırsak */
// const fs = require("fs")
// const path = require("path")
// //./files/starter.txt
// fs.readFile(path.join(__dirname,"files","starter.txt"),"utf8",(err,data) =>{
//   if(err) throw err;
//   console.log(data)
// })
// console.log("fs.read üste olmasına ragmen consola ilk ben geldim çünkü readfile asyn çalısıyor.")





/*Writing File */
// const fs = require("fs");
// const path = require("path");
// fs.writeFile(path.join(__dirname, "files", "forWriteModeFile.txt"),

//   "Write to file this text",
//   (err, data) => {
//     if (err) {throw err;}
//     console.log("Write Complated ")
//   }
// );





/*Append Mode */
// const fs = require("fs");
// const path = require("path");

// fs.appendFile(
//   path.join(__dirname, "files", "forAppendMode"),
//   "\nAppend this text to appendfile.txt",
//   (err, data) => {
//     if (err) console.log(err);
//     console.log("Appending complated");
//   }
// );






/*callback err fonsiyonlarından kurtulmak için try-catch yapısı kullanırsak */
// const fsPromises = require("fs").promises;
// const path = require("path");
// const fileOps = async () => {
//   try {
//     const data = await fsPromises.readFile(
//       path.join(__dirname, "files", "starter.txt"),
//       "utf8"
//     );
//     console.log(data);
//     await fsPromises.writeFile(
//       path.join(__dirname, "files", "promisWrite.txt"),
//       data
//     );
//     await fsPromises.appendFile(
//       path.join(__dirname, "files", "promisWrite.txt"),
//       "\n Append text  to promisWrite file"
//     );
//     await fsPromises.rename(
//       path.join(__dirname, "files", "promisWrite.txt"),
//       path.join(__dirname, "files", "promiseComplated.txt")
//     );

//     const newData = await fsPromises.readFile(
//       path.join(__dirname, "files", "promiseComplated.txt"),
//       "utf8"
//     );
//     console.log(newData);
//     await fsPromises.unlink(path.join(__dirname, "files", "starter.txt")); //delete file
//     //deleting starter.txt file
//   } catch (err) {
//     console.log(err);
//   }
// };
// fileOps();





/*better way to Data streaming for large files */
// const fs = require("fs")
// const rs = fs.createReadStream("./files/lorem.txt",{encoding:"utf8"})
// const ws = fs.createWriteStream("./files/new-lorem.txt")
// rs.pipe(ws)
// console.log("streaming complated")






/*klasör oluşturma */
// const fs = require("fs");

// if (!fs.existsSync("./forMakeNewDirExample")) {
//   fs.mkdir("./forMakeNewDirExample", (err) => {
//     if (err) throw err;
//     console.log("forMakeNewDirExample klasörü oluştruldu");
//   });
// }else{
//   console.log("forMakeDirExample klasörü önceden oluşturulmus")
// }





/* klasör silme */
// const fs = require("fs");

// if (fs.existsSync("./forMakeNewDirExample")) {
//   fs.rmdir("./forMakeNewDirExample", (err) => {
//     if (err) throw err;
//     console.log("forMakeNewDirExample klasörü silindi");
//   });
// }
