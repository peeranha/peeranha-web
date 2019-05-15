import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/communityIsSuggested.svg';

import messages from './messages';

const goToList = () => createdHistory.push(routes.suggestedCommunities());

export const CommunityIsSuggestedBanner = /* istanbul ignore next */ () => (
  <BaseRounded className="d-flex align-items-center py-5 my-3">
    <img className="mx-4" src={bannerImage} alt="banner" />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.thatisgreat} />
      </P>

      <P>
        <FormattedMessage {...messages.communityWillAppear} />
      </P>

      <LargeButton className="my-4" onClick={goToList}>
        <FormattedMessage {...messages.goToList} />
      </LargeButton>
    </div>
  </BaseRounded>
);

CommunityIsSuggestedBanner.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
};

export default React.memo(CommunityIsSuggestedBanner);
