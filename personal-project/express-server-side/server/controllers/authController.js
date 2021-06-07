const bcrypt = require("bcryptjs");

module.exports = {
  // Checks to see if user is in system, if not create a new account with that users email and password
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const [result] = await db.auth.check_user(email);
    if (result) {
      return res.status(409).send("Email already exists.");
    }
    const hash = bcrypt.hashSync(password);
    const [user] = await db.auth.register_user(email, hash);
    // Make a way to get the users diary entries here
    delete user.password;
    req.session.user = user;
    return res.status(200).send(req.session.user);
  },
  // Checks to see if user is in system, logs them in if password matches one stored in database
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const [user] = await db.auth.check_user(email);
    if (!user) {
      return res.status(401).send("User not found.");
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password);
    if (!isAuthenticated) {
      return res.status(401).send("Password incorrect.");
    }
    delete user.password;
    req.session.user = user;
    console.log(req.session.user);
    return res.status(200).send(req.session.user);
  },
  // Destroy the session if user logs out
  logout: (req, res) => {
    res.sendStatus(200);
  },
  //Get the user if they are still signed in and you reload the page
  getUser: (req, res) => {
    const { userId } = req.params;
    console.log("user is: ", userId);
    if (!userId) {
      return res.status(511).send("User not logged in.");
    }
    res.status(200).send(userId);
  },
};
