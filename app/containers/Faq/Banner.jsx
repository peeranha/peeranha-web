import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/faqBanner.svg?inline';

import messages from './messages';

export const Banner = () => (
  <Wrapper>
    <img src={bannerImage} alt="banner" />
    <div>
      <p>
        <FormattedMessage {...messages.didntFindAnswer} />
      </p>

      <p>
        <FormattedMessage {...messages.freeFeelToAsk} />
      </p>

      <Button onClick={() => createdHistory.push(routes.support())}>
        <FormattedMessage {...messages.help} />
      </Button>
    </div>
  </Wrapper>
);

export default React.memo(Banner);
