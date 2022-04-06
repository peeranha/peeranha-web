import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import * as routes from 'routes-config';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  singleCommunityStyles,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import { selectLogo } from 'containers/Home/selectors';

import H3 from 'components/H3';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import telosIcon from 'images/telosIcon.svg?inline';

import messages from 'containers/SignUp/messages';

import {
  HOW_STORE_MY_KEYS_QUESTION,
  CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
  CAN_I_DELETE_ACCOUNT_QUESTION,
  WHAT_IS_MASTER_KEY_QUESTION,
} from 'containers/Faq/constants';
import { DAEMON } from 'utils/constants';
import { HOME_KEY } from 'containers/Home/constants';

import { getLogo } from 'containers/Home/actions';
import reducer from 'containers/Home/reducer';
import saga from 'containers/Home/saga';

import SignUpWrapper from './index';
import {
  Li,
  P,
  CommunityLogoWrapper,
  CommunityLogoDescr,
  Logo,
} from './SignUpOptions';

const styles = singleCommunityStyles();
const single = isSingleCommunityWebsite();

const LeftMenu = ({ faqQuestions, route, mainLogo }) => (
  <>
    <div className="mb-4">
      {styles.withoutSubHeader ? (
        <CommunityLogoWrapper>
          <Link to={routes.questions()} href={routes.questions()}>
            <Logo src={mainLogo} width={styles.signUpLogoWidth} />
          </Link>
          <CommunityLogoDescr>
            <span>Q&A on</span>
            <Link to={routes.questions()} href={routes.questions()}>
              <img src={peeranhaLogo} width="90px" alt="Peeranha logo" />
            </Link>
          </CommunityLogoDescr>
        </CommunityLogoWrapper>
      ) : (
        <Link to={routes.questions()} href={routes.questions()}>
          <img src={mainLogo} width="180px" alt="Peeranha logo" />
        </Link>
      )}
    </div>

    <H3 className="d-flex align-items-center mb-4">
      <FormattedMessage
        {...messages.youNeedEosAccount}
        values={{
          image: (
            <a href="https://www.telosfoundation.io/" target="_blank">
              <img src={telosIcon} alt="telos" />
            </a>
          ),
        }}
      />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.theWayEosWorks} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouCreateEos} />
      </P>
    </div>

    {faqQuestions?.length > 0 && (
      <ul className="mb-4">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {faqQuestions.map((x, index) => <Li key={index}>{x}</Li>)}
      </ul>
    )}
  </>
);

const SignUpViaEmailWrapper = ({
  children,
  faqQuestions,
  route,
  logo,
  getLogoDispatch,
}) => {
  useEffect(
    () => {
      getLogoDispatch();
    },
    [single],
  );

  return (
    <SignUpWrapper
      LeftMenuChildren={
        <LeftMenu faqQuestions={faqQuestions} route={route} mainLogo={logo} />
      }
      RightMenuChildren={<div>{children}</div>}
    />
  );
};

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
  route: PropTypes.string,
  mainLogo: PropTypes.string,
};

SignUpViaEmailWrapper.propTypes = {
  children: PropTypes.any,
  faqQuestions: PropTypes.array,
  route: PropTypes.string,
  logo: PropTypes.string,
  getLogoDispatch: PropTypes.func,
};

const withConnect = connect(
  createStructuredSelector({
    faqQuestions: selectFaqQuestions([
      HOW_STORE_MY_KEYS_QUESTION,
      CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
      CAN_I_DELETE_ACCOUNT_QUESTION,
      WHAT_IS_MASTER_KEY_QUESTION,
    ]),
    logo: selectLogo(),
  }),
  dispatch => ({
    getLogoDispatch: bindActionCreators(getLogo, dispatch),
  }),
);

export default compose(
  injectReducer({ key: HOME_KEY, reducer }),
  injectSaga({ key: HOME_KEY, saga, mode: DAEMON }),
  withConnect,
)(SignUpViaEmailWrapper);
