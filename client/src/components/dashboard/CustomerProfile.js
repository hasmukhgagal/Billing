import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Paper, Typography, withStyles } from "@material-ui/core";
import { getAccounts, saveBill, getBills } from "../../actions/customerActions";

const styles = (theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
  },
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleAddClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <div className="col s6">
                <Paper className={classes.root} elevation={1}>
                  <Typography component="p">
                    Click on Button To Crate <br /> Bill
                  </Typography>
                  <br />
                  <Link
                    to="/customer/:id/CreateBill"
                    style={{
                      width: "172px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Create Bill
                  </Link>
                </Paper>
              </div>
              <div className="col s6">
                <Paper className={classes.root} elevation={1}>
                  <Typography component="p">
                    Click on Button To See History
                  </Typography>
                  <br />
                  <Link
                    to="/"
                    style={{
                      width: "140px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    History
                  </Link>
                </Paper>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withStyles(styles)(
  connect(mapStateToProps, { getAccounts })(Dashboard)
);
