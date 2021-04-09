import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import almostDoneBanner from 'images/communityIsSuggested.svg?inline';

import { InfoLink } from 'components/Button/Outlined/InfoLarge';

import messages from '../messages';
import { P } from '../index';

const CompletedRightMenu = () => (
  <div className="text-center py-5 px-4">
    <img
      className="mb-2"
      src={almostDoneBanner}
      alt="peeranha registration almost done"
    />
    <P className="text-center mb-4" mobileFS="16">
      <FormattedMessage {...messages.congratulations} />
    </P>
    <div>
      <InfoLink to={routes.questions()} className="w-100">
        <FormattedMessage {...messages.goToMainPage} />
      </InfoLink>
    </div>
  </div>
);

export default CompletedRightMenu;
