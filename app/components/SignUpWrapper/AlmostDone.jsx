import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as routes from 'routes-config';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import almostDoneBanner from 'images/communityIsSuggested.svg?inline';

import { selectFaqQuestions } from 'containers/DataCacheProvider/selectors';

import H3 from 'components/H3';
import Button from 'components/Button/Outlined/InfoLarge';

import messages from 'containers/SignUp/messages';

import {
  ALMOST_DONE_1ST_QUESTION,
  ALMOST_DONE_2ST_QUESTION,
  ALMOST_DONE_3ST_QUESTION,
} from 'containers/Faq/constants';

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const MainPageLink = Button.extend`
  position: relative;
`.withComponent(Link);

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
      <ul className="mb-4">{faqQuestions.map(x => <Li>{x}</Li>)}</ul>
    )}
  </React.Fragment>
);

const RightMenu = () => (
  <div className="text-center pt-5">
    <img
      className="mb-2"
      src={almostDoneBanner}
      alt="peeranha registration almost done"
    />
    <P className="text-center mb-4">
      <FormattedMessage {...messages.weWillNotify} />
    </P>
    <div>
      <MainPageLink to={routes.questions()} className="w-100">
        <FormattedMessage {...messages.goToMainPage} />
      </MainPageLink>
    </div>
  </div>
);

const AlmostDone = ({ faqQuestions }) => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu faqQuestions={faqQuestions} />}
    RightMenuChildren={<RightMenu />}
  />
);

const mapStateToProps = createStructuredSelector({
  faqQuestions: selectFaqQuestions([
    ALMOST_DONE_1ST_QUESTION,
    ALMOST_DONE_2ST_QUESTION,
    ALMOST_DONE_3ST_QUESTION,
  ]),
});

LeftMenu.propTypes = {
  faqQuestions: PropTypes.array,
};

AlmostDone.propTypes = {
  faqQuestions: PropTypes.array,
};

export default connect(
  mapStateToProps,
  null,
)(AlmostDone);
