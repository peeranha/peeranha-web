import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';
import createdHistory from 'createdHistory';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';
import TransparentButton from 'components/Button/Contained/TransparentSmall';

import loginMessages from './messages';
import signupMessages from '../SignUp/messages';

import { hideLoginModal } from './actions';

const Base = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;

  > span {
    font-size: 14px;
    color: ${TEXT_SECONDARY};
  }
`;

const IDontHaveAnAccount = ({ hideLoginModalDispatch, disabled }) => (
  <Base>
    <FormattedMessage {...loginMessages.iDontHaveAnAccount} />
    <TransparentButton
      onClick={() => {
        createdHistory.push(routes.signup.email.name);
        hideLoginModalDispatch();
      }}
      disabled={disabled}
      type="button"
    >
      <FormattedMessage {...signupMessages.signUp} />
    </TransparentButton>
  </Base>
);

IDontHaveAnAccount.propTypes = {
  hideLoginModalDispatch: PropTypes.func,
  disabled: PropTypes.func,
};

export default connect(
  null,
  dispatch => ({
    hideLoginModalDispatch: bindActionCreators(hideLoginModal, dispatch),
  }),
)(IDontHaveAnAccount);
