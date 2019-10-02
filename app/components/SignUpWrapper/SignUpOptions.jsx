import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import scatterLogo from 'images/scatterLogo.svg?inline';

import commonMessages from 'common-messages';
import messages from 'containers/SignUp/messages';
import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import H3 from 'components/H3';
import Span from 'components/Span';
import SecondaryLargeButton from 'components/Button/Outlined/SecondaryLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import { Div } from 'containers/SignUp/IHaveEOSAccountForm';

import {
  WHY_I_HAVE_TO_WAIT_QUESTION,
  WHEN_CAN_I_START_QUESTION,
  WHAT_IS_EOS_ACCOUNT_FOR_QUESTION,
} from 'containers/Faq/constants';

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
    color: ${TEXT_PRIMARY};
  }

  @media only screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 18px;
  }
`.withComponent('li');

const LeftMenu = ({ faqQuestions }) => (
  <React.Fragment>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="mb-4">
      <FormattedMessage {...messages.signUpOptions} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.steemitIsNotTypical} />
      </P>
      <P>
        <FormattedMessage {...messages.steemitBlockchainPowers} />
      </P>
      <P>
        <FormattedMessage {...messages.weAreHappyToCover} />
      </P>
      <P>
        <FormattedMessage {...messages.ifYouLikeToSkip} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">{faqQuestions.map(x => <Li>{x}</Li>)}</ul>
    )}
  </React.Fragment>
);

/* eslint react/no-children-prop: 0 */
const RightMenuWithoutScatter = ({
  children,
  showLoginModal,
  showScatterSignUpForm,
  showScatterSignUpProcessing,
}) => (
  <div className="py-5">
    {children}
    <Div className="py-5">
      <div className="text-center mb-3">
        <Span className="text-uppercase" fontSize="14" color={TEXT_SECONDARY}>
          <FormattedMessage {...messages.or} />
        </Span>
      </div>

      <div className="mb-3">
        <SecondaryLargeButton onClick={showScatterSignUpForm} className="w-100">
          <img src={scatterLogo} alt="scatter logo" />
        </SecondaryLargeButton>
      </div>

      <div className="text-center">
        <FormattedMessage {...messages.doYouHaveAlreadyAccount} />{' '}
        <TransparentButton
          className="py-1"
          onClick={showLoginModal}
          disabled={showScatterSignUpProcessing}
        >
          <FormattedMessage {...commonMessages.login} />
        </TransparentButton>
      </div>
    </Div>
  </div>
);

const SignUpOptions = ({
  children,
  showLoginModal,
  showScatterSignUpForm,
  showScatterSignUpProcessing,
  withScatter,
  faqQuestions,
}) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} />}
    RightMenuChildren={
      !withScatter ? (
        <RightMenuWithoutScatter
          children={children}
          showLoginModal={showLoginModal}
          showScatterSignUpForm={showScatterSignUpForm}
          showScatterSignUpProcessing={showScatterSignUpProcessing}
        />
      ) : (
        children
      )
    }
  />
);

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
};

RightMenuWithoutScatter.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showScatterSignUpForm: PropTypes.func,
  showScatterSignUpProcessing: PropTypes.bool,
};

SignUpOptions.propTypes = {
  children: PropTypes.any,
  showLoginModal: PropTypes.func,
  showScatterSignUpForm: PropTypes.func,
  showScatterSignUpProcessing: PropTypes.bool,
  withScatter: PropTypes.bool,
  faqQuestions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    WHY_I_HAVE_TO_WAIT_QUESTION,
    WHEN_CAN_I_START_QUESTION,
    WHAT_IS_EOS_ACCOUNT_FOR_QUESTION,
  ]),
});

export default connect(
  mapStateToProps,
  null,
)(SignUpOptions);
