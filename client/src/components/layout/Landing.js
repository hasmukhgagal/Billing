import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class Landing extends Component {
  render() {
    const { path } = this.props.match;
    const token = localStorage.jwtToken;
    // if (path === "/" && token) {
    //   return <Redirect to="/dashboard" />;
    // }
    return (
      <>
        {/* <div className="navbar-fixed">
          <div className="nav-wrapper white">
            <Link
              to="/"
              style={{
                fontFamily: "monospace",
                marginTop: "0.5em"
              }}
              className="col s5 brand-logo center black-text"
            >
              <i className="material-icons">library_books</i>
              LIBRARY
            </Link>
          </div>
        </div> */}
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Welcome</b> To Billing
              </h4>
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                  }}
                  className="btn btn-large btn-flat waves-effec hoverable white black-text"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Landing;
