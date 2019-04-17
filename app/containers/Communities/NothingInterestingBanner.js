import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/communitySuggest.svg';

import messages from './messages';

export const NothingInterestingBanner = /* istanbul ignore next */ ({
  goToCreateCommunityScreen,
}) => (
  <BaseRounded className="d-flex align-items-center py-5">
    <img
      className="mx-4"
      src={communitySuggestBanner}
      alt="communitySuggestBanner"
    />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.didntFindAnyInteresting} />
      </P>

      <P>
        <FormattedMessage {...messages.suggestInterestingComm} />
      </P>

      <LargeButton className="my-4" onClick={goToCreateCommunityScreen}>
        <FormattedMessage {...messages.suggestCommunity} />
      </LargeButton>
    </div>
  </BaseRounded>
);

NothingInterestingBanner.propTypes = {
  goToCreateCommunityScreen: PropTypes.func,
};

export default React.memo(NothingInterestingBanner);
