import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import home from './home';
import dashboard from './dashboard';
import registration from './auth/Registration';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
        <Route exact path={"/"} component={registration} />
          <Route exact path={"/zxc"} component={home} />
          <Route exact path={"/dashboard"} component={dashboard} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
