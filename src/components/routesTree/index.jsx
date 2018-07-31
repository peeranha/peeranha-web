import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';

import { lazyFunction } from 'common/utils';

const renderRoutes = routes => (routes
  ? routes.map((route, i) => (
    <Route
      key={route.key || i}
      exact={route.exact}
      path={route.path}
      render={
        props => (
          <route.component {...props} route={route}>
            {renderRoutes(route.routes)}
          </route.component>
        )
    }
    />
  ))
  : null);

const RouteShape = PropTypes.shape({
  path: PropTypes.string,
  component: PropTypes.func,
  exact: PropTypes.bool,
  routes: PropTypes.arrayOf(lazyFunction(() => RouteShape)),
});

class RoutesTree extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(RouteShape).isRequired,
  }

  render() {
    return (
      <Switch>
        {renderRoutes(this.props.routes)}
      </Switch>
    );
  }
}

export default RoutesTree;
