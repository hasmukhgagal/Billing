import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <>
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

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   List,
//   ListItem,
//   withStyles,
//   Grid,
//   SwipeableDrawer,
// } from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";

// const styles = (theme) => ({
//   list: {
//     width: 200,
//   },
//   padding: {
//     paddingRight: 30,
//     cursor: "pointer",
//   },

//   sideBarIcon: {
//     padding: 0,
//     color: "white",
//     cursor: "pointer",
//   },
// });

// class Landing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { drawerActivate: false, drawer: false };
//     this.createDrawer = this.createDrawer.bind(this);
//     this.destroyDrawer = this.destroyDrawer.bind(this);
//   }

//   componentWillMount() {
//     if (window.innerWidth <= 600) {
//       this.setState({ drawerActivate: true });
//     }

//     window.addEventListener("resize", () => {
//       if (window.innerWidth <= 600) {
//         this.setState({ drawerActivate: true });
//       } else {
//         this.setState({ drawerActivate: false });
//       }
//     });
//   }

//   //Small Screens
//   createDrawer() {
//     return (
//       <div>
//         <AppBar>
//           <Toolbar>
//             <Grid
//               container
//               direction="row"
//               justify="space-between"
//               alignItems="center"
//             >
//               <MenuIcon
//                 className={this.props.classes.sideBarIcon}
//                 onClick={() => {
//                   this.setState({ drawer: true });
//                 }}
//               />

//               <Typography color="inherit" variant="headline">
//                 Title
//               </Typography>
//               <Typography color="inherit" variant="headline"></Typography>
//             </Grid>
//           </Toolbar>
//         </AppBar>

//         <SwipeableDrawer
//           open={this.state.drawer}
//           onClose={() => {
//             this.setState({ drawer: false });
//           }}
//           onOpen={() => {
//             this.setState({ drawer: true });
//           }}
//         >
//           <div
//             tabIndex={0}
//             role="button"
//             onClick={() => {
//               this.setState({ drawer: false });
//             }}
//             onKeyDown={() => {
//               this.setState({ drawer: false });
//             }}
//           >
//             <List className={this.props.classes.list}>
//               <ListItem key={1} button divider>
//                 {" "}
//                 Option 1{" "}
//               </ListItem>
//               <ListItem key={2} button divider>
//                 {" "}
//                 Option 2{" "}
//               </ListItem>
//               <ListItem key={3} button divider>
//                 {" "}
//                 Option 3{" "}
//               </ListItem>
//             </List>
//           </div>
//         </SwipeableDrawer>
//       </div>
//     );
//   }

//   //Larger Screens
//   destroyDrawer() {
//     const { classes } = this.props;
//     return (
//       <AppBar>
//         <Toolbar>
//           <Typography
//             variant="headline"
//             style={{ flexGrow: 1 }}
//             color="inherit"
//           >
//             Title
//           </Typography>
//           <Typography
//             variant="subheading"
//             className={classes.padding}
//             color="inherit"
//           >
//             OPTION 1
//           </Typography>
//           <Typography
//             variant="subheading"
//             className={classes.padding}
//             color="inherit"
//           >
//             OPTION 2
//           </Typography>
//           <Typography
//             variant="subheading"
//             className={classes.padding}
//             color="inherit"
//           >
//             OPTION 3
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     );
//   }

//   render() {
//     return (
//       <div>
//         {this.state.drawerActivate ? this.createDrawer() : this.destroyDrawer()}
//       </div>
//     );
//   }
// }

// Landing.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Landing);
