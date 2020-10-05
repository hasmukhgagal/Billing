import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCustomer } from "../../actions/customerActions";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: "10%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      moNumber: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleAddUser = (e, token, metadata) => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      moNumber: this.state.moNumber,
      bills: {},
    };

    this.props.addCustomer(userData);
    this.props.history.push("/dashboard");
  };

  handleClose = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Paper elevation={15}>
          <CloseIcon
            onClick={this.handleClose}
            style={{ marginLeft: "96%", fontSize: "30px", cursor: "pointer" }}
          />
          <>
            <div className="container">
              <div style={{ marginTop: "4rem" }} className="row">
                <div>
                  <h3>Add new User</h3>
                  <form noValidate onSubmit={this.handleAddUser}>
                    <div className="input-field col s12">
                      <input onChange={this.onChange} id="name" type="email" />
                      <label htmlFor="text">Name</label>
                      <span className="red-text"></span>
                    </div>
                    <div className="input-field col s12">
                      <input
                        onChange={this.onChange}
                        id="moNumber"
                        type="text"
                      />
                      <label htmlFor="monileNumber">Mobile No.</label>
                      <span className="red-text"></span>
                    </div>
                    <div
                      className="col s12"
                      style={{ paddingLeft: "11.250px" }}
                    >
                      <button
                        style={{
                          width: "150px",
                          borderRadius: "3px",
                          letterSpacing: "1.5px",
                          marginTop: "1rem",
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
        </Paper>
      </div>
    );
  }
}

Customer.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withStyles(styles)(
  connect(mapStateToProps, { addCustomer })(Customer)
);
