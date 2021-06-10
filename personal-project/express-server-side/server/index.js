// Imports
require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const middleware = require("./middleware/middleware");

const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

// Controllers
const authCtrl = require("./controllers/authController");
const entryCtrl = require("./controllers/entryController");
const diaryCtrl = require("./controllers/diaryController");

//App instance
const app = express();

//Top level middleware added - including cookies
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(cors());

// DATABASE CONNECTION
massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("Database configured");
    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(err));

//Middleware

//Endpoints
//Auth
app.post("/auth/register", authCtrl.register);
app.post("/auth/login", authCtrl.login);
app.get("/auth/logout", authCtrl.logout);

//Entry
app.get("/entry/getEntry/:id", entryCtrl.getEntry);
app.post("/entry/addToDiary/:userId", middleware.auth, entryCtrl.addToDiary);
app.delete("/entry/deleteEntry", entryCtrl.deleteEntry);
app.put("/entry/editEntry/:userId", middleware.auth, entryCtrl.editEntry);

//Diary
app.get(
  "/diary/getAllEntries/:userId",
  middleware.auth,
  diaryCtrl.getAllEntries
);
