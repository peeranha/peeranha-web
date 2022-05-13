/**
 *
 * DeleteAccount
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import messages from './messages';

import reducer from './reducer';
import saga from './saga';

import { confirmTelegramAccount, unlinkTelegramAccount } from './actions';

import {
  CONFIRM_TG_ACCOUNT_ID,
  UNLINK_TG_ACCOUNT_ID,
  CONFIRM_TG_ACCOUNT,
  UNLINK_TG_ACCOUNT,
  TG_ACCOUNT_KEY,
} from './constants';

/* eslint-disable react/prefer-stateless-function */
export class TelegramAccountAction extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      actionType,
      data,
      profile,
      confirmTelegramAccountDispatch,
      unlinkTelegramAccountDispatch,
    } = this.props;

    const newProfile = {
      ...profile?.profile,
      temporaryAccountDisplayName: data?.temporaryAccountDisplayName,
      avatar: profile?.avatar ?? profile?.avatar,
      profileDisplayName: profile?.profileDisplayName ?? profile?.displayName,
    };

    return (
      <>
        {actionType === CONFIRM_TG_ACCOUNT && (
          <button
            id={CONFIRM_TG_ACCOUNT_ID}
            className="mr-3"
            onClick={() => {
              confirmTelegramAccountDispatch({
                profile: newProfile,
                userKey: profile.user,
              });
            }}
          >
            <FormattedMessage {...messages.confirm} />
          </button>
        )}

        {actionType === UNLINK_TG_ACCOUNT && (
          <button
            id={UNLINK_TG_ACCOUNT_ID}
            onClick={() => {
              unlinkTelegramAccountDispatch({
                profile: newProfile,
                userKey: profile.user,
              });
            }}
          >
            <FormattedMessage {...messages.unlink} />
          </button>
        )}
      </>
    );
  }
}

TelegramAccountAction.propTypes = {
  actionType: PropTypes.string,
  confirmTelegramAccountDispatch: PropTypes.func,
  unlinkTelegramAccountDispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    confirmTelegramAccountDispatch: bindActionCreators(
      confirmTelegramAccount,
      dispatch,
    ),
    unlinkTelegramAccountDispatch: bindActionCreators(
      unlinkTelegramAccount,
      dispatch,
    ),
  };
}

const withConnect = connect(null, mapDispatchToProps);

const withReducer = injectReducer({ key: TG_ACCOUNT_KEY, reducer });
const withSaga = injectSaga({
  key: TG_ACCOUNT_KEY,
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TelegramAccountAction);
