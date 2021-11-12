import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/communityIsSuggested.svg?inline';

import messages from './messages';

export const Banner = () => (
  <Wrapper>
    <img src={bannerImage} alt="create-community" />
    <div>
      <p>
        <FormattedMessage {...messages.thatisgreat} />
      </p>

      <p>
        <FormattedMessage {...messages.communityWillAppear} />
      </p>

      <Button onClick={() => createdHistory.push(routes.communities())}>
        <FormattedMessage {...messages.goToList} />
      </Button>
    </div>
  </Wrapper>
);

export default React.memo(Banner);
