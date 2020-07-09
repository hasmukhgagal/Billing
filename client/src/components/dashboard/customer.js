import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		marginTop: '10%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Customer = (props) => {
  const classes = useStyles();

  const handleAddUser = (e) => {
    e.preventDefault();
    props.props.history.push("/customers");
  }

  console.log("#", props)

  return (
    <div className={classes.root}>
      <Paper elevation={15}>
			<>
        <div className="container">
          <div style={{ marginTop: "4rem" }} className="row">
            <div>
          <h3>Add new User</h3>
              <form noValidate onSubmit={handleAddUser}>
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    
                  />
                  <label htmlFor="text">Name</label>
                  <span className="red-text">
                  </span>
                </div>
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    
                  />
                  <label htmlFor="monileNumber">Mobile No.</label>
                  <span className="red-text">
                  </span>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
export default Customer;