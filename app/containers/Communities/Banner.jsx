import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/communitySuggest.svg?inline';

import messages from './messages';
import { GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID } from './constants';

export const Banner = ({ goToCreateCommunityScreen }) => (
  <Wrapper>
    <img src={communitySuggestBanner} alt="create-community" />
    <div>
      <p>
        <FormattedMessage {...messages.didntFindAnyInteresting} />
      </p>

      <p>
        <FormattedMessage {...messages.suggestInterestingComm} />
      </p>

      <Button
        id={`${GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID}_banner`}
        onClick={goToCreateCommunityScreen}
      >
        <FormattedMessage {...messages.suggestCommunity} />
      </Button>
    </div>
  </Wrapper>
);

Banner.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
};

export default React.memo(Banner);
