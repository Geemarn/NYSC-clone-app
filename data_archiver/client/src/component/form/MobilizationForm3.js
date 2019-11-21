import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SelectListGroup from "../common/SelectListGroup";
import { addStates } from "../../actions/profileAction";

class MobilizationForm3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state1: "",
      state2: "",
      state3: "",
      medCondition: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const statesData = {
      state1: this.state.state1,
      state2: this.state.state2,
      state3: this.state.state3,
      medCondition: this.state.medCondition
    };

    this.props.addStates(statesData, this.props.history);
  }
  render() {
    const { errors } = this.state;
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

    //select medical challenge option
    const medOption = [
      { label: "*do you have a medical condition? ", value: 0 },
      { label: "NO", value: "NO" },
      { label: "YES", value: "YES" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="h3 display-5 text-center">
                Choose your desired state
              </p>
              <p>you can only pick three states</p>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  name="state1"
                  value={this.state.state1}
                  onChange={this.onChange}
                  options={stateOptions}
                  error={errors.state1}
                  info="select first chioce state"
                />
                <SelectListGroup
                  name="state2"
                  value={this.state.state2}
                  onChange={this.onChange}
                  options={stateOptions}
                  error={errors.state2}
                  info="select second chioce state"
                />
                <SelectListGroup
                  name="state3"
                  value={this.state.state3}
                  onChange={this.onChange}
                  options={stateOptions}
                  error={errors.state3}
                  info="select third chioce state"
                  require
                />
                <p>Indicate if you have any medical condition</p>
                <SelectListGroup
                  name="medCondition"
                  value={this.state.medCondition}
                  onChange={this.onChange}
                  options={medOption}
                  error={errors.medCondition}
                />
                <input
                  type="submit"
                  value="submit"
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

MobilizationForm3.propTypes = {
  errors: PropTypes.object.isRequired,
  addStates: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { addStates }
)(withRouter(MobilizationForm3));
