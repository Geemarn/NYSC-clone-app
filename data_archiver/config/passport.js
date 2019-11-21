const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Admin = mongoose.model("Admin");
const keys = require("../config/keys").secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            Admin.findById(jwt_payload.id).then(admin => {
              if (admin) {
                return done(null, admin);
              }
              return done(null, null);
            });
          }
          // return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
