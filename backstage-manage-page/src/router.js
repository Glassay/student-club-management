import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import BasicLayout from './layouts/BasicLayout';
import LoginLayout from './layouts/LoginLayout';
import SingleClub from './layouts/SingleClub';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/management" component={BasicLayout} />
        <Route path="/club" component={SingleClub}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
