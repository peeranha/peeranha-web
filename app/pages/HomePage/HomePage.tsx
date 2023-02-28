import React from 'react';
import { AnyAction, bindActionCreators, compose, Dispatch } from 'redux';
import { connect } from 'react-redux';

import Home from 'components/HomePage';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { selectSendMessageLoading } from './selectors';
import { sendMessage } from './actions';
import { HomepageProps } from './types';

const HomePage: React.FC<HomepageProps> = ({
  sendMessageLoading,
  sendMessageDispatch,
}): JSX.Element => (
  <Home
    sendMessageLoading={sendMessageLoading}
    sendMessageDispatch={sendMessageDispatch}
  />
);

export default compose(
  injectReducer({ key: 'homepage', reducer }),
  injectSaga({ key: 'homepage', saga }),

  connect(
    createStructuredSelector<any, any>({
      sendMessageLoading: selectSendMessageLoading(),
    }),
    (dispatch: Dispatch<AnyAction>) => ({
      sendMessageDispatch: bindActionCreators(sendMessage, dispatch),
    }),
  ),
)(HomePage);
