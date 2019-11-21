const express = require("express"),
  passport = require("passport"),
  router = express.Router();

//require models
const User = require("../../models/User");
const Profile = require("../../models/Profile");
//import validations
const validateProfileInput = require("../../validator/profile");
const validateEducationInput = require("../../validator/education");
const validateStateInput = require("../../validator/state");

// Define escapeRegex function for search feature
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// @route     GET routes/apis/profile/test
//@desc           Test profile route
//@access         Public
router.get("/test", (req, res) => res.json({ mes: "route is working fine" }));

// @route   GET routes/apis/profile
//@desc         get current user profile
//@access       Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", "email")
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile yet";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route     POST routes/apis/profile/
//@desc            create profile route
//@access          Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //get fields
    profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.title) profileFields.title = req.body.title;

    if (req.body.firstName) profileFields.firstName = req.body.firstName;

    if (req.body.lastName) profileFields.lastName = req.body.lastName;

    if (req.body.otherName) profileFields.otherName = req.body.otherName;

    if (req.body.address) profileFields.address = req.body.address;

    if (req.body.phoneNo) profileFields.phoneNo = req.body.phoneNo;

    if (req.body.DOB) profileFields.DOB = req.body.DOB;

    if (req.body.placeOfBirth)
      profileFields.placeOfBirth = req.body.placeOfBirth;

    if (req.body.stateOfOrigin)
      profileFields.stateOfOrigin = req.body.stateOfOrigin;

    if (req.body.maritalStatus)
      profileFields.maritalStatus = req.body.maritalStatus;

    profileFields.created = Date.now();

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create a profile and save
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route     POST /routes/apis/profile/education
//@desc            create profile route
//@access          Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    eduFields = {};

    if (req.body.school) eduFields.school = req.body.school;

    if (req.body.degree) eduFields.degree = req.body.degree;

    if (req.body.fieldOfStudy) eduFields.fieldOfStudy = req.body.fieldOfStudy;

    if (req.body.from) eduFields.from = req.body.from;

    if (req.body.to) eduFields.to = req.body.to;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile.education) {
        //update profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { education: eduFields } },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create profile with edufields
        profile.education.unshift(eduFields);
        profile.save().then(profile => res.json(profile));
      }
    });
  }
);
// @route     POST routes/apis/profile/state
//@desc            create state route
//@access          Private
router.post(
  "/state",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStateInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    stateFields = {};
    if (req.body.state1) stateFields.state1 = req.body.state1;
    if (req.body.state2) stateFields.state2 = req.body.state2;
    if (req.body.state3) stateFields.state3 = req.body.state3;
    if (req.body.medCondition) stateFields.medCondition = req.body.medCondition;

    Profile.findOne({ user: req.user.id }).exec(function(err, profile) {
      if (err) {
        return res.json(err);
      }

      if (profile.states) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: { states: stateFields } },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        profile.states.unshift(stateFields);
        profile.save().then(profile => res.json(profile));
      }
    });

    //   } else {
    //     errors.profile = "no profile yet";
    //     return res.status(404).json(errors);
    //   }
    // })
    // .catch(err => res.json(err));
  }
);

// @route   GET routes/apis/profile/1990-1999
//@desc         get current user profile
//@access       Private
router.get(
  "/1990-1999",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({
      created: {
        $gte: new Date(1990, 1, 1),
        $lt: new Date(1999, 12, 31)
      }
    })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile for this year range";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   GET routes/apis/profile/2000-2009
//@desc         get current user profile
//@access       Private
router.get(
  "/2000-2009",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({
      created: {
        $gte: new Date(2000, 1, 1),
        $lt: new Date(2009, 12, 31)
      }
    })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile for this year's range";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   GET routes/apis/profile/2010-2019
//@desc         get current user profile
//@access       Private
router.get(
  "/2010-2019",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({
      created: {
        $gte: new Date(2010, 1, 1),
        $lt: new Date(2019, 12, 31)
      }
    })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile for this year range";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   GET routes/apis/profile/2020-2029
//@desc         get current user profile
//@access       Private
router.get(
  "/2020-2029",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({
      created: {
        $gte: new Date(2020, 1, 1),
        $lt: new Date(2029, 12, 31)
      }
    })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile for this year range";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   GET routes/apis/profile/2030-2039
//@desc         get current user profile
//@access       Private
router.get(
  "/2030-2039",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.find({
      created: {
        $gte: new Date(2030, 1, 1),
        $lt: new Date(2039, 12, 31)
      }
    })
      .populate("user", ["name", "email"])
      .then(profile => {
        if (!profile) {
          errors.profile = "no profile for this year range";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

// @route   DELETE routes/apis/profile
//@desc            delete profile and user
//@access          Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @route   GET   routes/apis/profile/all & query search
//@desc            get profile
//@access          Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      Profile.find({ firstName: regex })
        .populate("user", ["name", "email"])
        .then(profile => {
          if (!profile) {
            noMatch = true;
          } else {
            res.json(profile);
          }
        });
    } else {
      Profile.find({})
        .populate("user", ["name", "email"])
        .then(profile => {
          if (!profile) {
            errors.profile = "no profile for this year range";
            return res.status(404).json(errors);
          } else {
            res.json(profile);
          }
        });
    }
  }
);

module.exports = router;
