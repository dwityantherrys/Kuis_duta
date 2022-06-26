import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import ProtectedRoute from './components/auth/protectedRoute';
import Main from './components/main/Main';
import create from './components/main/crud/Create.js';
import edit from './components/main/crud/Edit';
import show from './components/main/crud/Show.js';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgotPassword';
import Blank from './components/main/BlankPage';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/admin"
        component={Main}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/"
        component={Main}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/crud/create"
        component={create}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/crud/show/:id"
        component={show}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/crud/edit/:id"
        component={edit}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgetPassword} />
      <Route path="*" component={Blank} />
    </Switch>
  );
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
  };
}
export default connect(mapStateToProps)(App);
