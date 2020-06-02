import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Map from "./map/map";
import Add_Marker from "./map/add_marker"


import Home from "./Home";
import Dashboard from "./Dashboard";
import AuthenticationContext from "../auth"

export default class App extends Component {
  constructor() {
    super();

    const lsAuth = JSON.parse(localStorage.getItem("AUTH"));
    console.log(lsAuth)

    this.state = lsAuth || {
      token: "",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus() {

    // axios
    //   .get("http://localhost:3000/logged_in", { withCredentials: true })
    //   .then(response => {
    //     if (
    //       response.data.logged_in &&
    //       this.state.loggedInStatus === "NOT_LOGGED_IN"
    //     ) {
    //       this.setState({
    //         loggedInStatus: "LOGGED_IN",
    //         user: response.data.user
    //       });
    //     } else if (
    //       !response.data.logged_in &
    //       (this.state.loggedInStatus === "LOGGED_IN")
    //     ) {
    //       this.setState({
    //         loggedInStatus: "NOT_LOGGED_IN",
    //         user: {}
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log("check login error", error);
    //   });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      token: "",
      user: {}
    });
    localStorage.removeItem("AUTH")
  }

  handleLogin(data) {
    const nextState = {
      user: data.user,
      token: data.token,
    }
    localStorage.setItem("AUTH", JSON.stringify(nextState))
    this.setState(nextState);
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  token={this.state.token}
                />
              )}
            />
            <Route
              exact
              path={"/dashboard"}
              render={props => (
                <Dashboard
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  token={this.state.token}
                />
              )}
            />
            <Route
              exact
              path={"/map"}
              render={props => (
                <Map
                  {...props}
                  token={this.state.token}
                />
              )}
              />
              <Route
              exact
              path={"/add"}
              render={props => (
                <Add_Marker
                  {...props}
                  token={this.state.token}
                />
              )}
              />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}