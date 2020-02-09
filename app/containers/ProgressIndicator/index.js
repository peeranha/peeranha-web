import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectors from './imports';
import View from './View';

const ProgressIndicator = props => {
  const inProgress = Object.keys(props).find(x => props[x] === true);
  return <View inProgress={inProgress} />;
};

const mapStateToProps = createStructuredSelector(selectors);

export default connect(
  mapStateToProps,
  null,
)(ProgressIndicator);
