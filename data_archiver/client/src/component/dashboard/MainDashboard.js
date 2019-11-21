import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import FormContent from "./FormContent";
import { getCurrentProfile } from "../../actions/profileAction";

class MainDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check if profile of logged in user is not empty

      if (Object.keys(profile).length > 0 && profile.education.length > 0) {
        dashboardContent = <FormContent profile={profile} />;
      } else {
        //user loggeed in has no profile
        dashboardContent = (
          <div>
            <p className="h4 text-muted text-center">Welcome {user.name} </p>
            <p className="lead">
              You are about to start your registration process, please carefully
              fill out the forms correctly and make sure your name is already in
              the senate list for mobilization. Let's get started....
            </p>
            <Link className="btn btn-info btn-lg" to="/mobilization_form1">
              click to continue
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-5">Dashboard</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MainDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MainDashboard);
