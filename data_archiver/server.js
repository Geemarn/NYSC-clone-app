const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  passport = require("passport");

//import router
const user = require("./routes/api/user");
const admin = require("./routes/api/admin");
const profile = require("./routes/api/profile");

//use app
const app = express();

//connect database with mongoose
mongoose
  .connect("mongodb://localhost/NYSC_clone")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

//CONFIG APP
// config bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

//test app server
app.get("/", (req, res) => res.json({ mssg: "app working" }));

//use app
app.use("/routes/api/user", user);
app.use("/routes/api/admin", admin);
app.use("/routes/api/profile", profile);

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
