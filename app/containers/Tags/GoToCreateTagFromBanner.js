import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/Contained/InfoLarge';

import communitySuggestBanner from 'images/communitySuggest.svg?inline';

import messages from './messages';

export const GoToCreateTagFromBanner = /* istanbul ignore next */ ({
  openTagForm,
}) => (
  <BaseRounded className="d-flex align-items-center py-5 my-3">
    <img
      className="mx-4"
      src={communitySuggestBanner}
      alt="communitySuggestBanner"
    />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.didntFindSuitableTag} />
      </P>

      <P>
        <FormattedMessage {...messages.suggestTagWhichWillbeUseful} />
      </P>

      <LargeButton className="my-4" onClick={openTagForm}>
        <FormattedMessage {...commonMessages.suggestTag} />
      </LargeButton>
    </div>
  </BaseRounded>
);

GoToCreateTagFromBanner.propTypes = {
  openTagForm: PropTypes.func,
};

export default React.memo(GoToCreateTagFromBanner);
