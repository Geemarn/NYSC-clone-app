const express = require("express"),
  bcrypt = require("bcryptjs"),
  jwt = require("jsonwebtoken"),
  passport = require("passport"),
  router = express.Router();

//require model
const Admin = require("../../models/Admin");

//import validator
const validateAdminRegisterInput = require("../../validator/adminRegister");
const validateLoginInput = require("../../validator/login");

//import keys
const secrete = require("../../config/keys").secretOrKey;

//route  -       POST routes/api/admin/register
//desc   -            register route
//access -            public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateAdminRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then(user => {
    if (user) {
      (errors.email = "User email already exists"),
        res.status(400).json(errors);
    } else {
      const newUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      if (req.body.admin === "1234PAT") {
        newUser.admin = true;
      }
      //hashing the password with bcrypt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

//route  -       POST routes/api/admin/login
//desc   -            login route
//access -            public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then(admin => {
    if (!admin) {
      errors.email = "admin email does not exist";
      res.status(400).json(errors);
    } else {
      //check if password matches
      bcrypt.compare(req.body.password, admin.password).then(isMatch => {
        if (isMatch) {
          //user found
          //create jwt payload
          const payload = {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            admin: admin.admin
          };

          //sign in token
          jwt.sign(payload, secrete, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({
              success: true,
              token: "bearer " + token
            });
          });
        } else {
          errors.password = "password is incorrect";
          return res.status(400).json(errors);
        }
      });
    }
  });
});

//route-       GET routes/api/user/current
//desc-            current user route
//access-          private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
