import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as routes from 'routes-config';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import Button from 'components/Button/Outlined/InfoLarge';
import A from 'components/A';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import eosIcon from 'images/eosIcon.svg?inline';

import H3 from 'components/H3';

import messages from 'containers/SignUp/messages';

import {
  HOW_STORE_MY_KEYS_QUESTION,
  CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
  CAN_I_DELETE_ACCOUNT_QUESTION,
  WHAT_IS_MASTER_KEY,
} from 'containers/Faq/constants';

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const LeftMenu = ({ faqQuestions, route }) => (
  <React.Fragment>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="d-flex align-items-center mb-4">
      <img className="mr-4" src={eosIcon} alt="EOS icon" />
      <FormattedMessage {...messages.youNeedEosAccount} />
    </H3>

    <A to={route}>
      <Button className="mb-4">
        <FormattedMessage
          {...messages[
            route === routes.signup.haveEosAccount.name
              ? 'iHaveEosAccount'
              : 'idontHaveEosAccount'
          ]}
        />
      </Button>
    </A>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.theWayEosWorks} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouCreateEos} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">{faqQuestions.map(x => <Li>{x}</Li>)}</ul>
    )}
  </React.Fragment>
);

/* eslint react/no-children-prop: 0 */
const RightMenu = ({ children }) => <div>{children}</div>;

const YouNeedEosAccount = ({ children, faqQuestions, route }) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} route={route} />}
    RightMenuChildren={<RightMenu children={children} />}
  />
);

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
  route: PropTypes.string,
};

RightMenu.propTypes = {
  children: PropTypes.any,
};

YouNeedEosAccount.propTypes = {
  children: PropTypes.any,
  faqQuestions: PropTypes.array,
  route: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    HOW_STORE_MY_KEYS_QUESTION,
    CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
    CAN_I_DELETE_ACCOUNT_QUESTION,
    WHAT_IS_MASTER_KEY,
  ]),
});

export default connect(
  mapStateToProps,
  null,
)(YouNeedEosAccount);
