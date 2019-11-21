const mongoose = require("mongoose");
Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  otherName: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  placeOfBirth: {
    type: String,
    required: true
  },
  stateOfOrigin: {
    type: String,
    required: true
  },
  maritalStatus: {
    type: String,
    required: true
  },
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldOfStudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date,
        required: true
      }
    }
  ],
  states: [
    {
      state1: {
        type: String
      },
      state2: {
        type: String
      },
      state3: {
        type: String
      },
      medCondition: {
        type: String
      }
    }
  ],
  created: {
    type: Date
  }
});

module.exports = mongoose.model("Profile", profileSchema);
