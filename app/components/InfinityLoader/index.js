/**
 *
 * InfinityLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class InfinityLoader extends React.PureComponent {
  componentWillMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const {
      loadNextPaginatedData,
      isLoading,
      isLastFetch,
      infinityOff,
    } = this.props;
    const offsetHeightFromBottom = 100;

    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offsetHeightFromBottom &&
      !isLoading &&
      !isLastFetch &&
      !infinityOff
    ) {
      loadNextPaginatedData();
    }
  };

  render() {
    return React.Children.toArray(this.props.children);
  }
}

InfinityLoader.propTypes = {
  loadNextPaginatedData: PropTypes.func,
  isLoading: PropTypes.bool,
  infinityOff: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  children: PropTypes.element,
};

export default InfinityLoader;
