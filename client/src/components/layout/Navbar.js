import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { logoutUser } from "../../actions/authActions";
import "../../App.css";

const styles = (theme) => ({
  root: {
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLogout: true,
      anchorEl: null,
      open: false,
    };
  }

  onLogoutClick = (e) => {
    e.preventDefault();

    this.setState({ showLogout: false, open: false });

    this.props.logoutUser();
    // window.location.href = "./login";
  };

  handleMenu = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      setAnchorEl: null,
      open: false,
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { showLogout, anchorEl, open } = this.state;
    const { classes, history } = this.props;
    return (
      <div className="navbar-fixed">
        <div className="z-depth-0">
          <div className="nav-wrapper white">
            <AppBar>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <Link
                    to="/"
                    style={{
                      fontFamily: "monospace",
                      marginLeft: "0.5em",
                      fontSize: "2.5rem",
                      marginTop: "0.5em",
                    }}
                    className="col s5 brand-logo center black-text"
                  >
                    <i
                      className="material-icons"
                      style={{ marginRight: "0.5em" }}
                    >
                      library_books
                    </i>
                    Billing
                  </Link>
                </Typography>
                {isAuthenticated && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                    >
                      <AccountCircle style={{ fontSize: '35px' }}/>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={open}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.onLogoutClick}>Logout</MenuItem>
                      <MenuItem component={Link} to="/changePassword">
                        Change Password
                      </MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(mapStateToProps, { logoutUser })(Navbar)
);

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { withStyles } from "@material-ui/core/styles";

// import { logoutUser } from "../../actions/authActions";

// class Navbar extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       showLogout: true
//     };
//   }

//   onLogoutClick = e => {
//     e.preventDefault();

//     this.setState({ showLogout: false });

//     this.props.logoutUser();
//   };

//   render() {
//     const { isAuthenticated } = this.props.auth;
//     const { showLogout } = this.state;
//     return (
//       <div className="navbar-fixed">
//         <nav className="z-depth-0">
//           <div className="nav-wrapper white">
//             <span>
//               <Link
//                 to="/"
//                 style={{
//                   fontFamily: "monospace",
//                   marginTop: "0.5em"
//                 }}
//                 className="col s5 brand-logo center black-text"
//               >
//                 <i className="material-icons">library_books</i>
//                 LIBRARY
//               </Link>
//             </span>
//             {isAuthenticated && showLogout && (
//               <button
//                 style={{
//                   width: "150px",
//                   borderRadius: "3px",
//                   letterSpacing: "1.5px",
//                   marginTop: "1rem",
//                   marginLeft: "85%"
//                 }}
//                 onClick={this.onLogoutClick}
//                 className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//               >
//                 Logout
//               </button>
//             )}
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
