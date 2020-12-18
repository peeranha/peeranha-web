import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import * as routes from 'routes-config';
import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import messages from './messages';
import commonMessages from 'common-messages';

import { TEXT_PRIMARY, TEXT_LIGHT } from 'style-constants';
import {
  SECTION_ID,
  BOOST_SECTION,
  WHAT_IS_BOOST,
  HOW_TO_MAKE_A_STAKE,
} from 'containers/Faq/constants';

import activateBoostBanner from 'images/boost-banner.svg?inline';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import A from 'components/A';
import Span from 'components/Span';

const GoToBoostPage = Button.extend`
  margin-top: 10px;

  :hover {
    color: ${TEXT_LIGHT}
  }
`.withComponent(Link);

const BoostBanner = ({ userId }) => (    
  <Wrapper className="mt-3">
    <img src={activateBoostBanner} alt="boost-banner" />

    <div>
      <p>
        <FormattedMessage {...messages.getMoreWithBoost} />
      </p>

      <p>
        Learn <A to={routes.faq(getQuestionCode(SECTION_ID, ...WHAT_IS_BOOST.split('.')))}>
          <Span color={TEXT_PRIMARY}>what a Boost is</Span>
        </A> and <A to={routes.faq(getQuestionCode(SECTION_ID, ...HOW_TO_MAKE_A_STAKE.split('.')))}>
          <Span color={TEXT_PRIMARY}>how you place a stake</Span>
        </A> in the <A to={routes.faq(getSectionCode(SECTION_ID, BOOST_SECTION))}>
          <Span color={TEXT_PRIMARY}>FAQs</Span>
        </A>.
      </p>

      <GoToBoostPage to={routes.userBoost(userId)}>
        <FormattedMessage {...commonMessages.activateBoost} />
      </GoToBoostPage>
    </div>
  </Wrapper>
);

BoostBanner.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default React.memo(BoostBanner);
