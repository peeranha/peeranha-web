import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import List from './List';

const View = ({ communities }) => (
  <React.Fragment>
    <Header />
    <List communities={communities} />
  </React.Fragment>
);

View.propTypes = {
  communities: PropTypes.array,
};

export default React.memo(View);
