/*package.json dosyasında
projenin ihtiyaç duydugu modulleri ve 
Proje hakkında bilgileri içeren bir dosyadır.

Bu proje için yüklenen 3.party moduller
"dependencies": {
    "date-fns": "^2.28.0",
    "g": "^2.0.1",
    "nodemon": "^2.0.15"
  }
  objesine eklenir.

  devDependecies ise test ve developerlar için 
  gerekli moülleri ifade eder.

  "devDependencies": {
    "nodemon": "^2.0.15"
  }



  script kısmına ise start ve dev scriptlerini ekleyelim
  "scripts": {
    "start": "node index",
    "dev": "nodemon index"
  },
  terminalde npm run dev ile projemizi nodemon'da başlatalım
  npm start ile ise normal şekilde başlatacak
*/


/*şimdide yüklediğimiz nodemon modulunun dosyalarımızı
takip edip(monitoring), kaydettigimizde otomatik restart etmesini gözlemlemek için
date-fns ile time'i consola yazdıralım   */


/* module sürüm numaralarını incelersek
  ^x.yy.zz" şeklindedir.
  x = major version (büyük değişiklikler ile değişir)
  y = minor version (yeni özellikler gelirse değişir)
  z = patch version (buglar düzeltilirse değişir)
  anlamındadır ^ işareti ise ilgili bölümü update etme ama diğerlerini
  update et (update varsa) anlamına gelir. genelde major için kullanılır
  çünkü yeni major büyük değişiklikler getirebilir. uygulamanı kırabilir.

  örneğin date-fns için ^2 ile majoru update etme demiş olduk.
  ama minor ve patchleri güncelle dedik.
  
  update için npm update kullanılır
  
"dependencies": {
    "date-fns": "^2.28.0",
    "g": "^2.0.1"
  },*/

const {format} = require("date-fns")
console.log(format(new Date(),"dd.MM.yyyy - HH:mm:ss"));