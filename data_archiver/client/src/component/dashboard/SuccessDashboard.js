import React, { Component } from "react";
import { Link } from "react-router-dom";

class SuccessDashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h4>Congratulations, registration Successful</h4>
            <Link className="btn btn-primary btn-lg" to="/new_dashboard">
              click to continue
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessDashboard;
