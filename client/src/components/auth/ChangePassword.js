import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changePassword } from "../../actions/authActions";
import classnames from "classnames";

window.show = true;

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      oldPassword: "",
      newPassword: "",
      errors: {},
      success: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ success: true });

    const { oldPassword, newPassword, email } = this.state;
    const userData = {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    this.props.changePassword(userData, this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  handleClose = () => {
    this.setState({ success: false });
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div>
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back
                to home
              </Link>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
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
                    onChange={this.onChange}
                    value={this.state.oldPassword}
                    error={errors.error}
                    id="oldPassword"
                    type="password"
                    className={classnames("", {
                      invalid: errors.error
                    })}
                  />
                  <label htmlFor="password">old Password</label>
                  <span className="red-text">{errors.error}</span>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.newPassword}
                    error={errors.newPassword}
                    id="newPassword"
                    type="password"
                    className={classnames("", {
                      invalid: errors.newPassword
                    })}
                  />
                  <label htmlFor="password2">New Password</label>
                  <span className="red-text">{errors.newPassword}</span>
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
            </div>
          </div>
        </div>
      </>
    );
  }
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
