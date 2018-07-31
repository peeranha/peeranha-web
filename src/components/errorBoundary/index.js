import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  componentDidCatch(error, info) {
    console.log(error, info, this);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
