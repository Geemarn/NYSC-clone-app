import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileAction";
import NewContent from "./NewContent";
import FormContent from "./FormContent";

class NewDashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated && this.props.auth.user.admin) {
      this.props.history.push("/admin_dashboard");
    } else {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    const { user } = this.props.auth;

    let newDashboardContent;

    if (profile === null || loading) {
      newDashboardContent = <Spinner />;
    } else {
      if (
        Object.keys(profile).length > 0 &&
        profile.education.length === 0 &&
        profile.states.length === 0
      ) {
        //user profile do not exist or has no states
        newDashboardContent = (
          <div>
            <p className="h4 text-muted text-center">Welcome {user.name} </p>
            <p className="lead">Please continue your application....</p>
            <Link className="btn btn-info btn-lg" to="/mobilization_form2">
              click to continue
            </Link>
          </div>
        );
      }
      if (
        Object.keys(profile).length > 0 &&
        profile.education.length > 0 &&
        profile.states.length === 0
      ) {
        return <FormContent profile={profile} />;
      }
      //check if profile of logged in user is not empty and education and states
      if (
        Object.keys(profile).length > 0 &&
        profile.states.length > 0 &&
        profile.education.length > 0
      ) {
        newDashboardContent = <NewContent profile={profile} />;
      }
      if (Object.keys(profile).length === 0) {
        //user profile do not exist or has no states or education
        newDashboardContent = (
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
      <div className="card card-body mb-3">
        <div className="row pad">{newDashboardContent}</div>
      </div>
    );
  }
}

NewDashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(NewDashboard);
