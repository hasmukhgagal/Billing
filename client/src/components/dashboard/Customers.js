import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { deleteAccount } from "../../actions/customerActions";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  withStyles,
  Button,
  Snackbar,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
  },
  right: {
    marginLeft: "auto",
    marginRight: "20px",
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
    borderRadius: "50%",
  },
});

class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      id: "",
    };
  }

  // Delete account
  onDeleteClick = (id) => {
    this.setState({
      alert: true,
      id,
    });
  };

  handleClose = () => {
    this.setState({
      alert: false,
    });
  };

  confirmDelete = () => {
    const { accounts } = this.props;
    const accountData = {
      id: this.state.id,
      accounts: accounts,
    };
    this.props.deleteAccount(accountData);
    this.setState({
      alert: false,
    });
  };

  handleListItemClick = (index, id) => {
    this.setState({
      selectedIndex: index,
    });
    this.props.history.push(`/customer/${id}`);
  };

  render() {
    var a = new Date();
    const { classes } = this.props;
    const { accounts } = this.props;

    let Accounts = [];
    let capitalize;
    accounts.map(
      (account) => (
        (capitalize =
          account.name.charAt(0).toUpperCase() + account.name.slice(1)),
        Accounts.push({ name: capitalize, id: account._id })
      )
    );
    Accounts.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });

    return (
      <div className={classes.root}>
        {this.state.alert && (
          <Snackbar open={this.state.alert} onClose={this.handleClose}>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              Do You Want to Delete This Account
              <Button onClick={this.confirmDelete.bind(this)}>Delete</Button>
              <Button onClick={this.handleClose}>Cancel</Button>
            </Alert>
          </Snackbar>
        )}
        <List aria-label="main mailbox folders">
          {accounts !== null &&
            accounts.length > 0 &&
            Accounts.map((account) => (
              <ListItem
                key={account.id}
                button
                onClick={() => this.handleListItemClick(1, account.id)}
              >
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText>{account.name}</ListItemText>
                <ListItemSecondaryAction>
                  <div className={classes.right}>
                    <button
                      onClick={this.onDeleteClick.bind(this, account.id)}
                      className="btn btn-small btn-floating waves-effect waves-light hoverable red accent-3"
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  </div>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

Customers.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(mapStateToProps, { deleteAccount })(Customers)
);
