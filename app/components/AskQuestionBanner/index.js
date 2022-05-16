import React from 'react';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import createdHistory from 'createdHistory';

import Banner from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import bannerImage from 'images/faqBanner.svg?inline';

import messages from './messages';

export const AskQuestionBanner = () => (
  <Banner>
    <img src={bannerImage} alt="askQuestionBanner" />
    <div>
      <p>
        <FormattedMessage id={messages.didntFindAnswer.id} />
      </p>

      <p>
        <FormattedMessage id={messages.freeFeelToAsk.id} />
      </p>

      <Button onClick={() => createdHistory.push(routes.support())}>
        <FormattedMessage id={messages.help.id} />
      </Button>
    </div>
  </Banner>
);

export default React.memo(AskQuestionBanner);
