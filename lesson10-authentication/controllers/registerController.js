const usersDb = {
  users: require("../model/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bccrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res.status(400).json({
      message: "Username and password are required",
    });
  const dublicate = usersDb.users.find((person) => person.user === user);
  if (dublicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bccrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    usersDb.setUser([...usersDb.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDb.users)
    );
    console.log(usersDb.users);
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
