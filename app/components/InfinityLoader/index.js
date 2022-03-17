/**
 *
 * InfinityLoader
 *
 */

import { useEffect, Children } from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export const InfinityLoader = ({ children }) => {
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
