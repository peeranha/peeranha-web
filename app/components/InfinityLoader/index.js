/**
 *
 * InfinityLoader
 *
 */

import { useEffect, Children } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export const InfinityLoader = ({
  children,
  loadNextPaginatedData,
  isLoading,
  isLastFetch,
  infinityOff,
}) => {
  const onScroll = () => {
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

  useEffect(() => {
    window.addEventListener('scroll', onScroll, false);
    return () => window.removeEventListener('scroll', onScroll, false);
  });

  return Children.toArray(children);
};

InfinityLoader.propTypes = {
  loadNextPaginatedData: PropTypes.func,
  isLoading: PropTypes.bool,
  infinityOff: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
  ]),
};

export default InfinityLoader;
