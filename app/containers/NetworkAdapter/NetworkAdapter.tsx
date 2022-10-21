import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';

import reducer from './reducer';
import saga from './saga';

const NetworkAdapter: React.FC = ({ children }): JSX.Element => {
  return children;
};

const withReducer = injectReducer({ key: 'networkAdapter', reducer });
const withSaga = injectSaga({ key: 'networkAdapter', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
)(NetworkAdapter);
