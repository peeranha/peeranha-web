import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';

import { RoutesTree } from 'components';

class Root extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)).isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    routes: RoutesTree.propTypes.routes.isRequired,
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        <ConnectedRouter history={this.props.history} store={this.props.store}>
          <RoutesTree routes={this.props.routes} />
        </ConnectedRouter>
      </IntlProvider>
    );
  }
}

export default Root;
