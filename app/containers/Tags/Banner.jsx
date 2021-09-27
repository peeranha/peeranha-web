import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/box_with_tags.svg?inline';

import messages from './messages';

import { GO_TO_CREATE_TAG_SCREEN_BUTTON_ID } from './constants';

export const Banner = ({ openTagForm, communityId }) => (
  <Wrapper>
    <img src={communitySuggestBanner} alt="tags-banner" />
    <div>
      <p>
        <FormattedMessage {...messages.didntFindSuitableTag} />
      </p>

      <p>
        <FormattedMessage {...messages.suggestTagWhichWillbeUseful} />
      </p>

      <Button
        data-communityid={communityId}
        id={`${GO_TO_CREATE_TAG_SCREEN_BUTTON_ID}_banner`}
        onClick={openTagForm}
      >
        <FormattedMessage {...commonMessages.createTag} />
      </Button>
    </div>
  </Wrapper>
);

Banner.propTypes = {
  openTagForm: PropTypes.func,
  communityId: PropTypes.number,
};

export default React.memo(Banner);
