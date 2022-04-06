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
import { singleCommunityStyles, isSingleCommunityWebsite } from 'utils/communityManagement';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';
import { selectLogo } from 'containers/Home/selectors';

import Button from 'components/Button/Outlined/InfoLarge';
import A from 'components/A';
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
  <React.Fragment>
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

    {/*{faqQuestions && (*/}
    {/*  <ul className="mb-4">*/}
    {/*    {faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}*/}
    {/*  </ul>*/}
    {/*)}*/}
  </React.Fragment>
);

/* eslint react/no-children-prop: 0 */
const RightMenu = ({ children }) => <div>{children}</div>;

const YouNeedEosAccount = ({
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
      LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} route={route} mainLogo={logo} />}
      RightMenuChildren={<RightMenu children={children} />}
    />
  );
}

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
  route: PropTypes.string,
  mainLogo: PropTypes.string,
};

RightMenu.propTypes = {
  children: PropTypes.any,
};

YouNeedEosAccount.propTypes = {
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
)(YouNeedEosAccount);
