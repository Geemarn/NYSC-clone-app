import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
import PrivateRoute from "./component/common/PrivateRoute";

import "./App.css";

import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Footer from "./component/layout/Footer";
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import AdminRegister from "./component/auth/AdminRegister";
import MainDashboard from "./component/dashboard/MainDashboard";
import SuccessDashboard from "./component/dashboard/SuccessDashboard";
import NewDashboard from "./component/dashboard/NewDashboard";
import AdminDashboard from "./component/dashboard/AdminDashboard";
import MobilizationForm1 from "./component/form/MobilizationForm1";
import MobilizationForm2 from "./component/form/MobilizationForm2";
import MobilizationForm3 from "./component/form/MobilizationForm3";
import MobilizationEditForm1 from "./component/editForm/MobilizationEditForm1";
import MobilizationEditForm2 from "./component/editForm/MobilizationEditForm2";
import AdminLogin from "./component/auth/AdminLogin";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="main-container">
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin_register" component={AdminRegister} />
              <Route exact path="/admin_login" component={AdminLogin} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={MainDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/success_dashboard"
                  component={SuccessDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/new_dashboard"
                  component={NewDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/mobilization_form1"
                  component={MobilizationForm1}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/mobilization_form2"
                  component={MobilizationForm2}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/mobilization_form3"
                  component={MobilizationForm3}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/editMobilization_form1"
                  component={MobilizationEditForm1}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/editMobilization_form2"
                  component={MobilizationEditForm2}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/admin_dashboard"
                  component={AdminDashboard}
                />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
