import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import BasicLayout from './layouts/BasicLayout';
import LoginLayout from './layouts/LoginLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={LoginLayout} />
        <Route path="/management" component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
