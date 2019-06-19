import React from 'react';
import PropTypes from 'prop-types';

import { getValueFromSearchString } from 'utils/url';
import history from 'createdHistory';

class LocationProvider extends React.Component {
  componentDidMount() {
    const { search } = window.location;
    const pathname = getValueFromSearchString(search, 'pathname');

    if (pathname) {
      history.push(pathname);
    }
  }
  render() {
    return this.props.children;
  }
}

LocationProvider.propTypes = {
  children: PropTypes.any,
};

export default LocationProvider;
