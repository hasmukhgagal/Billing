import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { logoutUser } from "../../actions/authActions";
import AddCustomer from "./AddCustomer";
import Customer from "./customer"
const styles = (theme) => ({
  root: {
    width: 1000,
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      open: false,
    };
  }

  handleAddClick = () => {
    this.setState({
      open: true
    })
    // this.props.history.push('/dashboard/customer')
  }

  render() {
    const { user } = this.props.auth;
    const { classes } = this.props;
    console.log(this.props.open);
    return (
      <>
        {this.state.open && <Customer props={this.props} />}
        <AddCustomer onClick={() => this.handleAddClick()}/>
      </>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withStyles(styles)(
  connect(mapStateToProps, { logoutUser })(Dashboard)
);