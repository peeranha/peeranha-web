import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorBoundary } from 'app/components';

class BaseLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          {this.props.children}
        </ErrorBoundary>
      </div>
    );
  }
}

export default BaseLayout;
