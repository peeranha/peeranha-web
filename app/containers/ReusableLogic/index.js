/**
 *
 * ReusableLogic
 *
 */

import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export const ReusableLogic = ({ children }) => children;

const withConnect = connect(
  null,
  null,
);

const withReducer = injectReducer({ key: 'reusableLogic', reducer });
const withSaga = injectSaga({ key: 'reusableLogic', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ReusableLogic);
