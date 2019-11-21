import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileDatas extends Component {
  render() {
    const { profile } = this.props;

    const state1 = profile.states.map(state => state.state1);
    const state2 = profile.states.map(state => state.state2);
    const state3 = profile.states.map(state => state.state3);
    const medCondition = profile.states.map(state => state.medCondition);
    const myDOB = <Moment format="DD/MM/YYYY">{profile.DOB}</Moment>;

    const education = this.props.profile.education.map(edu => (
      <tr key={edu._id}>
        <td>
          {" "}
          <span className="text-danger">School: </span>
          {edu.school}
        </td>{" "}
        ****{" "}
        <td>
          <span className="text-danger"> Degree: </span>
          {edu.degree}
        </td>{" "}
        ****{" "}
        <td>
          <span className="text-danger"> Field of study: </span>
          {edu.fieldOfStudy}
        </td>{" "}
        ****{" "}
        <td>
          <span className="text-danger"> From - To: </span>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        </td>
      </tr>
    ));

    return (
      <div className="card card-body">
        <div className="row">
          <p className="h5 admin-text">{profile.user.name}'s profile</p>
          <p>
            <span className="text-danger"> Full name</span>{" "}
            <span className="text-muted">(lastName/firstName/(others)): </span>
            {profile.title} {profile.lastName}, {profile.firstName}{" "}
            {profile.otherName} ****
            <span className="text-danger"> Email:</span> {profile.user.email}{" "}
            ****
            <span className="text-danger"> Address:</span> {profile.address}{" "}
            **** <span className="text-danger"> phoneNo: </span>
            {profile.phoneNo}
          </p>
          <p>
            <span className="text-danger"> date of birth: </span>
            {myDOB} ****
            <span className="text-danger"> Place of birth: </span>
            {profile.placeOfBirth} ****
            <span className="text-danger"> State of origin: </span>
            {profile.stateOfOrigin} ****
            <span className="text-danger"> Marital status: </span>
            {profile.maritalStatus}
          </p>
          <p>{education}</p>
          <p>
            <span className="text-danger"> First choice state: </span> {state1}
            <span className="text-danger"> Second choice state: </span> {state2}
            <span className="text-danger"> Third choice state: </span> {state3}
            <span className="text-danger"> Medical condition: </span>{" "}
            {medCondition}
          </p>
        </div>
      </div>
    );
  }
}

ProfileDatas.propTypes = {
  profile: PropTypes.object.isRequired
};
export default ProfileDatas;
