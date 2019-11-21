import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextareaFieldGroup from "../common/TextareaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { editProfile, getCurrentProfile } from "../../actions/profileAction";
import isEmpty from "../../validator/isEmpty";

class MobilizationEditForm1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      firstName: "",
      lastName: "",
      otherName: "",
      address: "",
      phoneNo: "",
      DOB: "",
      placeOfBirth: "",
      stateOfOrigin: "",
      maritalStatus: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string

      profile.otherName = !isEmpty(profile.otherName) ? profile.otherName : "";

      // Set component fields state
      this.setState({
        title: profile.title,
        firstName: profile.firstName,
        lastName: profile.lastName,
        otherName: profile.otherName,
        address: profile.address,
        phoneNo: profile.phoneNo,
        DOB: profile.DOB,
        placeOfBirth: profile.placeOfBirth,
        stateOfOrigin: profile.stateOfOrigin,
        maritalStatus: profile.maritalStatus
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      title: this.state.title,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      otherName: this.state.otherName,
      address: this.state.address,
      phoneNo: this.state.phoneNo,
      DOB: this.state.DOB,
      placeOfBirth: this.state.placeOfBirth,
      stateOfOrigin: this.state.stateOfOrigin,
      maritalStatus: this.state.maritalStatus
    };
    console.log(profileData);
    this.props.editProfile(profileData, this.props.history);
  }
  render() {
    const { errors } = this.state;

    //select option for title
    const titleOptions = [
      { label: "*Select title", value: 0 },
      { label: "Mr", value: "Mr" },
      { label: "Mrs", value: "Mrs" },
      { label: "Miss", value: "Miss" }
    ];
    //select option for marital status
    const MSOptions = [
      { label: "*Select marital status", value: 0 },
      { label: "single", value: "single" },
      { label: "married", value: "married" },
      { label: "divorced", value: "divorced" },
      { label: "complicated", value: "complicated" }
    ];

    //select option for state
    const stateOptions = [
      { label: "*Select state", value: 0 },
      { label: "Abia", value: "Abia" },
      { label: "Adamawa", value: "Adamawa" },
      { label: "Akwa-Ibom", value: "Akwa-Ibom" },
      { label: "Anambra", value: "Anambra" },
      { label: "Bauchi", value: "Bauchi" },
      { label: "Benue", value: "Benue" },
      { label: "Borno", value: "Borno" },
      { label: "Beyelsa", value: "Beyelsa" },
      { label: "Cross river", value: "Cross river" },
      { label: "Delta", value: "Delta" },
      { label: "Edo", value: "Edo" },
      { label: "Ekiti", value: "Ekiti" },
      { label: "Enugu", value: "Enugu" },
      { label: "Ebonyi", value: "Ebonyi" },
      { label: "FCT", value: "FCT" },
      { label: "Gombe", value: "Gombe" },
      { label: "Imo", value: "Imo" },
      { label: "kaduna", value: "kaduna" },
      { label: "Kebbi", value: "Kebbi" },
      { label: "Kano", value: "Kano" },
      { label: "Kogi", value: "Kogi" },
      { label: "Kwara", value: "Kwara" },
      { label: "Lagos", value: "Lagos" },
      { label: "Nassarawa", value: "Nassarawa" },
      { label: "Niger", value: "Niger" },
      { label: "Ogun", value: "Ogun" },
      { label: "Ondo", value: "Ondo" },
      { label: "Osun", value: "Osun" },
      { label: "Oyo", value: "Oyo" },
      { label: "Plateau", value: "Plateau" },
      { label: "Taraba", value: "Taraba" },
      { label: "Sokoto", value: "Sokoto" },
      { label: "Yobe", value: "Yobe" },
      { label: "Damaturu", value: "Damaturu" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="h3 display-4 text-center">Edit personal details</p>
              <p className="d-block">
                * <small className="text-danger"> = required field</small>
              </p>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  options={titleOptions}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="first name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <TextFieldGroup
                  placeholder="last name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                  info="enter your surname name"
                />
                <TextFieldGroup
                  placeholder="othe name(s)"
                  name="otherName"
                  value={this.state.otherName}
                  onChange={this.onChange}
                  error={errors.otherName}
                />
                <TextareaFieldGroup
                  placeholder="address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="enter your permanent address"
                />
                <TextFieldGroup
                  placeholder="phone number"
                  name="phoneNo"
                  value={this.state.phoneNo}
                  onChange={this.onChange}
                  error={errors.phoneNo}
                />
                <TextFieldGroup
                  placeholder="dirth of birth"
                  type="date"
                  name="DOB"
                  value={this.state.DOB}
                  onChange={this.onChange}
                  error={errors.DOB}
                />
                <TextFieldGroup
                  placeholder="place of birth"
                  name="placeOfBirth"
                  value={this.state.placeOfBirth}
                  onChange={this.onChange}
                  error={errors.placeOfBirth}
                />
                <SelectListGroup
                  name="stateOfOrigin"
                  value={this.state.stateOfOrigin}
                  onChange={this.onChange}
                  options={stateOptions}
                  error={errors.stateOfOrigin}
                />
                <SelectListGroup
                  placeholder="marital status"
                  name="maritalStatus"
                  value={this.state.maritalStatus}
                  onChange={this.onChange}
                  options={MSOptions}
                  error={errors.maritalStatus}
                />
                <input
                  type="submit"
                  value="Save and Continue"
                  className="btn bg-success btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MobilizationEditForm1.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProfile, getCurrentProfile }
)(withRouter(MobilizationEditForm1));
