import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import almostDoneBanner from 'images/communityIsSuggested.svg?inline';

import H3 from 'components/H3';
import Button from 'components/Button/Outlined/InfoLarge';

import messages from 'containers/SignUp/messages';

import SignUpWrapper from './index';
import { Li, P } from './SignUpOptions';

const MainPageLink = Button.extend`
  position: relative;
`.withComponent(Link);

const LeftMenu = () => (
  <React.Fragment>
    <div className="mb-4">
      <Link to={routes.questions()} href={routes.questions()}>
        <img src={peeranhaLogo} width="180px" alt="Peeranha logo" />
      </Link>
    </div>

    <H3 className="d-flex align-items-center mb-4">
      <FormattedMessage {...messages.firstFAQAlmostDone} />
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

    <ul className="mb-4">
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.firstFAQAlmostDone} />
        </Link>
      </Li>
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.secondFAQAlmostDone} />
        </Link>
      </Li>
      <Li>
        <Link to={routes.faq()} href={routes.faq()}>
          <FormattedMessage {...messages.thirdFAQAlmostDone} />
        </Link>
      </Li>
    </ul>
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

const AlmostDone = () => (
  <SignUpWrapper
    LeftMenuChildren={<LeftMenu />}
    RightMenuChildren={<RightMenu />}
  />
);

export default React.memo(AlmostDone);
