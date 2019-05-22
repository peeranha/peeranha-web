import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/faqBanner.svg';

import messages from './messages';

export const Banner = /* istanbul ignore next */ () => (
  <BaseRounded className="d-flex align-items-center py-5 my-3">
    <img className="mx-4" src={bannerImage} alt="banner" />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.didntFindAnswer} />
      </P>

      <P>
        <FormattedMessage {...messages.freeFeelToAsk} />
      </P>

      <LargeButton
        className="my-4"
        onClick={() => createdHistory.push(routes.support())}
      >
        <FormattedMessage {...messages.help} />
      </LargeButton>
    </div>
  </BaseRounded>
);

export default React.memo(Banner);
