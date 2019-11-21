import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class NewContent extends Component {
  render() {
    const { profile } = this.props;

    const state2 = profile.states.map(state => state.state2);
    const medCondition = profile.states.map(state => state.medCondition);

    //date
    const newDate = <Moment format="DD-MM-YYYY">{profile.DOB}</Moment>;
    const num = profile.education.map(edu =>
      edu.school.slice(0, 3).toUpperCase()
    );
    const istnum = profile.firstName.length;
    const sndnum = profile.lastName.length;

    return (
      <div>
        <p className="admin-text h5">Details</p>
        <hr />
        <p>
          <span className="text-success">Full Name: </span>
          <span className="text-capitalize">{profile.lastName},</span>{" "}
          {profile.firstName} {profile.otherName}
        </p>
        <p>
          <span className="text-success">date of birth: </span>
          {newDate}
        </p>
        <p>
          <span className="text-success">state of origin: </span>
          {profile.stateOfOrigin}
        </p>
        <p>
          <span className="text-success">call up Number: </span>
          NYSC/{num}/{new Date().getFullYear()}/1{istnum}
          {sndnum}
          {istnum + 1}
          {sndnum - 2}
        </p>

        <p>
          {" "}
          you have been posted to <span className="text-info">{state2}</span>
        </p>
        {medCondition[0] === "YES" ? (
          <p className="text-danger">
            Bring your medical report to camp for you to collect an exemption
            letter
          </p>
        ) : (
          <p className="text-danger">You have no medical conditions</p>
        )}
      </div>
    );
  }
}

NewContent.propTypes = {
  profile: PropTypes.object.isRequired
};

export default NewContent;
