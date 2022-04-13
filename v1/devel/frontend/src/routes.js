import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'

import { AdminRoute } from 'support/helpers'
import { HomePage } from 'pages/home'
import { ApplicationPage } from 'pages/application'
import { Admin } from 'pages/admin'
import { Auth } from 'pages/auth'

const Routes = () => {

    // React to changes in auth (logout)
    useStoreState(state => state.auth)

    return (
      <>
      <Switch>
        <Route exact path="/about" component={HomePage} />
        <Route exact path="/apply" component={ApplicationPage} />

        <AdminRoute exact path="/admin" component={Admin.AdminPage} />
        <AdminRoute exact path="/admin/users" component={Admin.UsersPage} />
        <AdminRoute exact path="/admin/history" component={Admin.HistoryPage} />
        <AdminRoute exact path="/admin/applications" component={Admin.ApplicationsPage} />
        <AdminRoute exact path="/admin/application/:id" component={Admin.ApplicationPage} />

        <Route exact path="/signup" component={Auth.SignupPage} />
        <Route exact path="/login" component={Auth.LoginPage} />
        <Route exact path="/logout" component={Auth.LogoutPage} />
        <Route exact path="/forgot/username" component={Auth.ForgotUsernamePage} />
        <Route exact path="/forgot/password" component={Auth.ForgotPasswordPage} />
        <Route exact path="/reset/password/:token" component={Auth.ResetPasswordPage} />

        <Redirect to="/about" />
      </Switch>
      </>
    )
}

export { Routes } 
