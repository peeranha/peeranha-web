/**
 *
 * InfinityLoader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
class InfinityLoader extends React.Component {
  componentWillMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const { loadNextPaginatedData, isLoading, isLastFetch } = this.props;
    const offsetHeightFromBottom = 100;

    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - offsetHeightFromBottom &&
      !isLoading &&
      !isLastFetch
    ) {
      loadNextPaginatedData();
    }
  };

  render = () => React.Children.only(this.props.children);
}

InfinityLoader.propTypes = {
  loadNextPaginatedData: PropTypes.func,
  isLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  children: PropTypes.object,
};

export default InfinityLoader;
