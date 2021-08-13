import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import isMobile from 'ismobilejs';

import * as routes from 'routes-config';

import { LINK_COLOR } from 'style-constants';
import {
  HOW_STORE_MY_KEYS_QUESTION,
  CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
  CAN_I_DELETE_ACCOUNT_QUESTION,
} from 'containers/Faq/constants';

import peeranhaLogo from 'images/LogoBlack.svg?inline';

import commonMessages from 'common-messages';
import messages from 'containers/SignUp/messages';

import { singleCommunityStyles } from 'utils/communityManagement';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import H3 from 'components/H3';
import Span from 'components/Span';
import TransparentButton from 'components/Button/Contained/Transparent';
import { Div } from 'containers/SignUp/IHaveEOSAccountForm';
import Footer from 'containers/Login/Footer';

import SignUpWrapper from './index';

export const P = Span.extend`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 30px;
`.withComponent('p');

export const Li = P.extend`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 10px;

  a {
    color: ${LINK_COLOR};
  }

  @media only screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 18px;
  }
`.withComponent('li');

export const CommunityLogoWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const CommunityLogoDescr = styled.div`
  display: flex;
  align-items: start;
  padding-top: 4px;

  span {
    margin-right: 6px;

    font-size: 14px;
    font-weight: 600;

    opacity: 0.4;
  }

  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
  }
`;

export const Logo = styled.span`
  display: block;
  width: ${({ width }) => width || '180px'};
  height: 56px;

  background-position: bottom left;
  background-image: url(${({ src }) => src});
  background-size: contain;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 60px;
`;

const styles = singleCommunityStyles();

const LeftMenu = ({ faqQuestions, mainLogo }) => (
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
          <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
        </Link>
      )}
    </div>

    <H3 className="mb-4">
      <FormattedMessage {...messages.signUpOptions} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.peeranhaIsNotTypical} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouLikeToSkip} />
      </P>
      <P>
        <FormattedMessage {...messages.weAreHappyToCover} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">
        {faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}
      </ul>
    )}
  </React.Fragment>
);

/* eslint react/no-children-prop: 0 */
const RightMenuWithoutScatter = ({
  children,
  showLoginModal,
  showWalletSignUpForm,
  showWalletSignUpProcessing,
  emailVerificationProcessing,
  emailChecking,
}) => (
  <div className="py-5">
    {children}
    <Div>
      <Footer
        walletAction={showWalletSignUpForm}
        showWalletSignUpProcessing={showWalletSignUpProcessing}
        emailVerificationProcessing={emailVerificationProcessing}
        emailChecking={emailChecking}
        signUpText={<FormattedMessage {...commonMessages.signUpViaWallet} />}
      />

      <LoginLink>
        <FormattedMessage {...messages.doYouHaveAlreadyAccount} />{' '}
        <TransparentButton
          className="py-1"
          onClick={showLoginModal}
          disabled={
            showWalletSignUpProcessing ||
            emailChecking ||
            emailVerificationProcessing
          }
        >
          <FormattedMessage {...commonMessages.login} />
        </TransparentButton>
      </LoginLink>
    </Div>
  </div>
);

export const SignUpOptions = ({
  children,
  showLoginModal,
  showWalletSignUpForm,
  showWalletSignUpProcessing,
  emailVerificationProcessing,
  emailChecking,
  withWallet,
  faqQuestions,
  logo,
}) => {
  return (
    <SignUpWrapper
      LeftMenuChildren={
        <LeftMenu faqQuestions={faqQuestions} mainLogo={logo} />
      }
      RightMenuChildren={
        !withWallet ? (
          <RightMenuWithoutScatter
            children={children}
            showLoginModal={showLoginModal}
            showWalletSignUpForm={showWalletSignUpForm}
            showWalletSignUpProcessing={showWalletSignUpProcessing}
            emailVerificationProcessing={emailVerificationProcessing}
            emailChecking={emailChecking}
            isMobileDevice={isMobile(window.navigator).any}
          />
        ) : (
          children
        )
      }
    />
  );
};

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
  mainLogo: PropTypes.string,
};

RightMenuWithoutScatter.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showWalletSignUpForm: PropTypes.func,
  showWalletSignUpProcessing: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  emailChecking: PropTypes.bool,
  isMobileDevice: PropTypes.bool,
};

SignUpOptions.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showWalletSignUpForm: PropTypes.func,
  showWalletSignUpProcessing: PropTypes.bool,
  emailVerificationProcessing: PropTypes.bool,
  emailChecking: PropTypes.bool,
  withWallet: PropTypes.bool,
  faqQuestions: PropTypes.array,
  logo: PropTypes.string,
};

export default connect(
  createStructuredSelector({
    faqQuestions: selectFaqQuestions([
      HOW_STORE_MY_KEYS_QUESTION,
      CAN_SIGN_UP_WITH_EAMIL_IF_HAVE_TELOS_ACCT_QUESTION,
      CAN_I_DELETE_ACCOUNT_QUESTION,
    ]),
  }),
  null,
)(SignUpOptions);
