import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { forgotPassword, verificationCode } from "../../actions/authActions";
import classnames from "classnames";
import { withStyles, Grid, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Navbar from "../layout/Navbar";
import Loader from "../Loader";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4)
  }
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: false,
      verificationCode: "",
      confirmCode: false,
      code: "",
      newPassword: "",
      oldPassword: "",
      errors: {},
      failed: false
    };
  }

  componentWillMount() {}

  componentDidMount(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email } = this.state;
    let code;
    if (email) {
      code = Math.floor(100000 + Math.random() * 9000);
    }
    const userData = {
      email: email,
      code: code
    };
    this.props.verificationCode(userData);
    this.setState({
      verificationCode: code,
      message: true
    });
  };

  handleVerify = e => {
    if (this.state.verificationCode === parseInt(this.state.code)) {
      this.setState({ confirmCode: true, message: false, email: "" });
    } else {
      this.setState({
        failed: true
      });
    }
  };

  failed = () => {
    return (
      <Snackbar
        open={this.state.failed}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <Alert
          variant="filled"
          onClose={this.handleClose}
          severity="error"
          id="response"
        >
          Incorrect Verification Code !
        </Alert>
      </Snackbar>
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ message: false });
    const { newPassword, email } = this.state;
    const userData = {
      newPassword: newPassword,
      email: email
    };

    this.props.forgotPassword(userData, this.props.history);
  };

  resetForm = () => {
    this.setState({
      name: "",
      email: ""
    });
  };

  render() {
    const {
      verificationCode,
      code,
      confirmCode,
      errors,
      email,
      message
    } = this.state;
    const { classes } = this.props;
    const { loading } = this.props.auth;
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div>
              {/* <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
                to home
              </Link> */}
              {this.failed()}
              {!verificationCode && (
                <form noValidate onSubmit={this.handleSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.handleChange}
                      value={email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
              {loading && (
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  className={classes.root}
                >
                  <Loader />
                </Grid>
              )}
              <br />
              <br />
              {verificationCode && message && !loading && (
                <>
                  <span>Please Enter Verification Code Here.</span>
                  <div className="input-field col s12">
                    <input
                      onChange={this.handleChange}
                      value={code}
                      error={errors.code}
                      id="code"
                      type="text"
                      className={classnames("", {
                        invalid: errors.code
                      })}
                    />
                    <label htmlFor="email">Code</label>
                    <span className="red-text">{errors.code}</span>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      onClick={this.handleVerify}
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
              {confirmCode && (
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      onChange={this.handleChange}
                      value={email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("", {
                        invalid: errors.email || errors.emailnotfound
                      })}
                    />
                    <label htmlFor="email">Email</label>
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
                  </div>
                  <div className="input-field col s12">
                    <input
                      onChange={this.handleChange}
                      value={this.state.newPassword}
                      error={errors.password}
                      id="newPassword"
                      type="password"
                    />
                    <label htmlFor="password2">New Password</label>
                    <span className="red-text">{errors.password}</span>
                  </div>
                  <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <button
                      style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                      }}
                      type="submit"
                      className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  verificationCode: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(
  connect(mapStateToProps, { forgotPassword, verificationCode })(ForgotPassword)
);
