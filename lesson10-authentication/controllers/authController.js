const usersDb = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: "Username and password are required",
    });
  const foundUser = usersDb.users.find((person) => {
    person.username === user;
  });
  if (!foundUser) return res.sendStatus(401); //unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser);
  if (match) {
    //create JWTs
    res.json({ success: `User${user} logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {handleLogin}