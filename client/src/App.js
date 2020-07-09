import React, { Component } from "react";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import store from "./store";
import Home from "./Home";

const THEME = createMuiTheme({
  typography: {
   "fontFamily": 'monospace',
  }
});

class App extends Component {
  render() {
    return (
      <>
      <MuiThemeProvider theme={THEME}>
        <Provider store={store}>
          <Home />
        </Provider>
        </MuiThemeProvider>
      </>
    );
  }
}

export default App;
