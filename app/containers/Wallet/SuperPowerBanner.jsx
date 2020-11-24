import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { getQuestionCode, getSectionCode } from 'utils/mdManagement';

import messages from './messages';
import commonMessages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';
import { ACTIVATE_SUPERPOWER_BUTTON_ID } from './constants';
import {
  SECTION_ID,
  SUPERPOWER_SECTION,
  WHAT_IS_SUPERPOWER,
  HOW_TO_MAKE_A_BET,
} from 'containers/Faq/constants';

import activateSuperPowerBanner from 'images/superpower.svg?inline';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import A from 'components/A';
import Span from 'components/Span';

const SuperPowerBanner = ({ activateSuperPower }) => (    
  <Wrapper className="mt-3">
    <img src={activateSuperPowerBanner} alt="superpower-banner" />

    <div>
      <p>
        <FormattedMessage {...messages.getMoreWithSuperPower} />
      </p>

      <p>
        Learn <A to={routes.faq(getQuestionCode(SECTION_ID, ...WHAT_IS_SUPERPOWER.split('.')))}>
          <Span color={TEXT_PRIMARY}>what a SuperPower is</Span>
        </A> and <A to={routes.faq(getQuestionCode(SECTION_ID, ...HOW_TO_MAKE_A_BET.split('.')))}>
          <Span color={TEXT_PRIMARY}>how you place a bet</Span>
        </A> in the <A to={routes.faq(getSectionCode(SECTION_ID, SUPERPOWER_SECTION))}>
          <Span color={TEXT_PRIMARY}>FAQs</Span>
        </A>.
      </p>

      <Button
        id={`${ACTIVATE_SUPERPOWER_BUTTON_ID}_banner`}
        onClick={activateSuperPower}
      >
        <FormattedMessage {...commonMessages.activateSuperPower} />
      </Button>
    </div>
  </Wrapper>
);

SuperPowerBanner.propTypes = {
  activateSuperPower: PropTypes.func,
};

export default React.memo(SuperPowerBanner);
