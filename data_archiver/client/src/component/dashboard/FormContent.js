import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

class FormContent extends Component {
  render() {
    const { profile } = this.props;

    const education = this.props.profile.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldOfStudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        </td>
      </tr>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">Personal Information</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="name">
                    {profile.title}{" "}
                    <span className="text-capitalize">{profile.lastName} </span>
                    {profile.firstName} {profile.otherName}
                  </td>
                </tr>
                <tr>
                  <td>{profile.user.email}</td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">Home address: </span>
                    {profile.address}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">phone contact: </span>
                    {profile.phoneNo}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">date-of-bith: </span>{" "}
                    <Moment format="DD/MM/YYYY">{profile.DOB}</Moment>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">place-of-bith: </span>{" "}
                    {profile.placeOfBirth}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">State of origin: </span>{" "}
                    {profile.stateOfOrigin}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="text-muted">marital status: </span>
                    {profile.maritalStatus}
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th className="text-center">Education</th>
                </tr>
              </thead>

              <thead>
                <tr>
                  <th>school</th>
                  <th>degree</th>
                  <th>field of study</th>
                  <th>
                    Date <small className="text-muted">(DD/MM/YYYY)</small>
                  </th>
                </tr>
              </thead>
              <tbody>{education}</tbody>
            </table>
            <br />
            <p className="text-danger">
              Your informations will be stored permananently, check the data
              above before you continue.
            </p>
            <Link
              to="/mobilization_form3"
              className="btn btn-success btn-lg mr-3"
            >
              Continue
            </Link>
            <Link
              to="/editMobilization_form1"
              className="btn btn-warning btn-lg"
            >
              Edit Form
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

FormContent.propTypes = {
  profile: PropTypes.object.isRequired
};

export default connect(null)(FormContent);
