import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions/auth";
import { withStyles } from "@material-ui/styles";
import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../firebase";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockResetIcon from '@mui/icons-material/LockResetOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Tugas Besar Pemrograman Berbasis Framework'}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const styles = () => ({
  "@global": {
      body: {
          backgroundColor: "#fff"
      }
  },
  paper: {
      marginTop: 100,
      display: "flex",
      padding: 20,
      flexDirection: "column",
      alignItems: "center"
  },
  avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      backgroundColor: "#f50057"
  },
  form: {
      marginTop: 1
  },
  errorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center"
  }
});

const theme = createTheme();



class Login extends Component { 
    state = { email: "", password: "" };
    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email } = this.state;
        // sendPasswordResetEmail(email);
    };

    render() {
        const { classes, loginError, isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
              <ThemeProvider theme={theme}>
              <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                      <LockResetIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Reset Password
                    </Typography>
                    <Box component="form" sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={this.handleEmailChange}
                      />
                        {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                Incorrect email or password.
                            </Typography>
                        )}
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            className={classes.submit}
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </Button>
                      <Grid container>
                        <Grid item xs>
                          <h3 color="red">OR</h3>
                        <Button
                           type="button"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           className={classes.submit}
                          href="/login"
                        >
                            Login
                        </Button>
                        </Grid>
                      </Grid>
                      <Copyright sx={{ mt: 5 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </ThemeProvider>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}
export default withStyles(styles)(connect(mapStateToProps)(Login));