import React from 'react';
import { routes } from './routes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute } from './private-routes';

export const AppRoute: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route: any) => {
          return (
            <PrivateRoute
              key={route.path}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              exact
            />
          );
        })}
      </Switch>
    </Router>
  );
};
