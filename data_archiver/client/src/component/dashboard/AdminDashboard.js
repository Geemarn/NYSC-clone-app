import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Files from "react-files";
import {
  getProfiles1,
  getProfiles2,
  getProfiles3,
  getProfiles4,
  getProfiles5,
  getProfiles6,
  getSearch
} from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileDatas from "./ProfileDatas";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      files: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.user.admin) {
      this.props.history.push("/new_dashboard");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.search && this.state.search.length > 1) {
        if (this.state.search.length % 2 === 0) {
          this.props.getSearch(this.state.search);
        }
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.getSearch(this.state.search);
  }

  onClick1(e) {
    e.preventDefault();
    this.props.getProfiles1();
  }
  onClick2(e) {
    e.preventDefault();
    this.props.getProfiles2();
  }
  onClick3(e) {
    e.preventDefault();
    this.props.getProfiles3();
  }
  onClick4(e) {
    e.preventDefault();
    this.props.getProfiles4();
  }
  onClick5(e) {
    e.preventDefault();
    this.props.getProfiles5();
  }
  onClick6(e) {
    e.preventDefault();
    this.props.getProfiles6();
  }

  omFilesChange(files) {
    this.setState({ files }, () => {
      window.alert(`${this.state.files.length} files uploaded succesfully!`);
    });
    // console.log("onsubmit");
    // const formData = new FormData();
    // Object.keys(this.state.files).forEach(key => {
    //   const file = this.state.files[key];
    //   formData.append(
    //     key,
    //     new Blob([file], { type: file.type }),
    //     file.name || "file"
    //   );
    // });

    // axios
    //   .post(`/files`, formData)
    //   .then(response =>
    //     window.alert(`${this.state.files.length} files uploaded succesfully!`)
    //   )
    //   .catch(err => window.alert("Error uploading files :("));
  }
  onFilesError(error, file) {
    console.log("error code " + error.code + ": " + error.message);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    const { user } = this.props.auth;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileDatas key={profile._id} profile={profile} user={user} />
        ));
      } else {
        profileItems = <h4>No Profiles Found...</h4>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="display-5 text-center">
                Student Database for mobilization
              </h2>
              <p className="lead text-center primary-color">
                Databases are arranged in archives, kindly choose which date
                range you would checkout.
              </p>
              <div className="margin-left">
                <form action="" onSubmit={this.onSubmit} className="form-group">
                  <input
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.onChange}
                    className="form-control text p-3 mb-2"
                    placeholder="Search database by first name"
                  />
                  <input
                    type="submit"
                    value="search database"
                    className="btn btn-success"
                  />
                </form>
              </div>
              <Files
                onChange={this.omFilesChange.bind(this)}
                onError={this.onFilesError.bind(this)}
                multiple
                maxFiles={3}
                maxFileSize={100000000}
                minFileSize={0}
                clickable
              >
                <button className="btn btn-info">Import</button>
              </Files>
              <div className="margin-left2">
                <p className="h5 admin-text"> Archives</p>
                <button
                  className="admin-btn"
                  onClick={this.onClick1.bind(this)}
                >
                  1990 - 1999
                </button>
                <button
                  className="admin-btn"
                  onClick={this.onClick2.bind(this)}
                >
                  2000 - 2009
                </button>
                <button
                  className="admin-btn"
                  onClick={this.onClick3.bind(this)}
                >
                  2010 - 2019
                </button>
                <button
                  className="admin-btn"
                  onClick={this.onClick4.bind(this)}
                >
                  2020 - 2029
                </button>
                <button
                  className="admin-btn"
                  onClick={this.onClick5.bind(this)}
                >
                  2030 - 2039
                </button>
                <button
                  className="admin-user-btn"
                  onClick={this.onClick6.bind(this)}
                >
                  All user
                </button>
              </div>
              <hr />
              {this.state.files.length > 0 ? (
                <div>
                  <ul className="list-group">
                    {this.state.files.map(file => (
                      <li key={file.id} className="list-item">
                        <div>
                          {file.preview.type === "image" ? (
                            <img
                              style={{ width: "200px", height: "200px" }}
                              src={file.preview.url}
                              alt=""
                            />
                          ) : (
                            <div>{file.extension}</div>
                          )}
                        </div>
                        <div>
                          <div>{file.name}</div>
                          <div>{file.sizeReadable}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  getProfiles1: PropTypes.func.isRequired,
  getProfiles2: PropTypes.func.isRequired,
  getProfiles3: PropTypes.func.isRequired,
  getProfiles4: PropTypes.func.isRequired,
  getProfiles5: PropTypes.func.isRequired,
  getProfiles6: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    getProfiles1,
    getProfiles2,
    getProfiles3,
    getProfiles4,
    getProfiles5,
    getProfiles6,
    getSearch
  }
)(AdminDashboard);
