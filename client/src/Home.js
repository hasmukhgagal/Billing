import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  changePassword,
} from "./actions/authActions";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import store from "./store";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import forgotPassword from "./components/auth/forgotPassword";
import ChangePassword from "./components/auth/ChangePassword";
import Customers from "./components/dashboard/Customers"

//Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
    this.props.dispatch({ type: "MESSAGE", payload: "" });
  };
  render() {
    const { message, auth } = this.props;
    const { open } = this.state;
    return (
      <>
        <Provider store={store}>
          <Router>
            <div className="App">
              <Navbar />
              {message ? (
                <Snackbar
                  open={open}
                  autoHideDuration={3000}
                  onClose={this.handleClose}
                >
                  <Alert variant="filled" severity="success">
                    {message}
                  </Alert>
                </Snackbar>
              ) : (
                ""
              )}
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgotPassword" component={forgotPassword} />
              <Route exact path="/changePassword" component={ChangePassword} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              {/* <Route exact path="/dashboard/customer" component={Dashboard} /> */}
              <Route exact path="/customers" component={Customers} props={auth}/>
            </div>
          </Router>
        </Provider>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.common.message,
  auth: state.auth,
});

export default connect(mapStateToProps)(Home);
