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

module.exports = corsOptions;
