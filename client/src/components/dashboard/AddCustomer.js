import React, { Component } from "react";
  import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
    borderRadius: "50%",
  },
});

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
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
      <div className={classes.root}>
        <Link to="/addCustomer">
          <Button
            onClick={this.handleAddClick}
            color="primary"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            style={{
              borderRadius: "50%",
              color: "white",
              minWidth: "0",
              height: "56px",
              width: "56px",
            }}
          >
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(connect(mapStateToProps, {})(AddCustomer));
