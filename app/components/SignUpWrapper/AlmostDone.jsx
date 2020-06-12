/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import almostDoneBanner from 'images/communityIsSuggested.svg?inline';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import H3 from 'components/H3';
import { InfoLink } from 'components/Button/Outlined/InfoLarge';

import messages from 'containers/SignUp/messages';

import {
  ALMOST_DONE_1ST_QUESTION,
  ALMOST_DONE_2ST_QUESTION,
  ALMOST_DONE_3ST_QUESTION,
} from 'containers/Faq/constants';

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const LeftMenu = ({ faqQuestions }) => (
  <React.Fragment>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="d-flex align-items-center mb-4">
      <FormattedMessage {...messages.almostDone} />
    </H3>

    <div className="mb-4">
      <P>
        <FormattedMessage {...messages.firstParagraphAlmostDone} />
      </P>
      <P>
        <FormattedMessage {...messages.secondParagraphAlmostDone} />
      </P>
      <P>
        <FormattedMessage {...messages.thirdParagraphAlmostDone} />
      </P>
    </div>

    {faqQuestions && (
      <ul className="mb-4">
        {faqQuestions.map(x => <Li key={x.props.children}>{x}</Li>)}
      </ul>
    )}
  </React.Fragment>
);

const RightMenu = ({ message }) => (
  <div className="text-center py-5 px-4">
    <img
      className="mb-2"
      src={almostDoneBanner}
      alt="peeranha registration almost done"
    />
    <P className="text-center mb-4" mobileFS="16">
      {message}
    </P>
    <div>
      <InfoLink to={routes.questions()} className="w-100">
        <FormattedMessage {...messages.goToMainPage} />
      </InfoLink>
    </div>
  </div>
);

const AlmostDone = ({ faqQuestions, message }) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} />}
    RightMenuChildren={<RightMenu message={message} />}
  />
);

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    ALMOST_DONE_1ST_QUESTION,
    ALMOST_DONE_2ST_QUESTION,
    ALMOST_DONE_3ST_QUESTION,
  ]),
});

export default connect(
  mapStateToProps,
  null,
)(AlmostDone);
