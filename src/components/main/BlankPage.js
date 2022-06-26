import "./Main.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

class BlankPage extends Component {

        render() {

        const { isLoggingOut, logoutError } = this.props;
        return (
            <div class="container">
            <Alert severity="error">
            <AlertTitle>Sorry, this page isn't available</AlertTitle>
            The link you followed may be broken, or page may have been removed. <strong><a href="/">Go back to Home.</a></strong>
            </Alert>
            </div>
          );
    }
}
function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(BlankPage);