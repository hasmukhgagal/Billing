import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { logoutUser } from "../../actions/authActions";
import { getAccounts } from "../../actions/customerActions";
import AddCustomer from "./AddCustomer";
import Customers from "./Customers";

const styles = (theme) => ({
  root: {},
});

class Dashboard extends Component {
  componentDidMount() {
    this.props.getAccounts();
  }
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      open: false,
    };
  }

  handleAddClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { accounts } = this.props.customer;
    const props = this.props.history;
    return (
      <div>
        <Customers accounts={accounts} history={props} />
        <AddCustomer onClick={() => this.handleAddClick()} />
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  customer: state.customer,
});
export default withStyles(styles)(
  connect(mapStateToProps, { logoutUser, getAccounts })(Dashboard)
);
