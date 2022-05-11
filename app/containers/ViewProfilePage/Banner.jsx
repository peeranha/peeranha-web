import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Banner';
import H4 from 'components/H4';

import noActivityImg from 'images/userHasntActivity.png';
import messages from 'containers/Profile/messages';

const Banner = () => (
  <div>
    <H4 isHeader>
      <FormattedMessage id={messages.activity.id} />
    </H4>
    <Wrapper>
      <img src={noActivityImg} alt="view-profile" />
      <div>
        <p>
          <FormattedMessage id={messages.userHasntActivityYet.id} />
        </p>

        <p>
          <FormattedMessage id={messages.heHasNoAnswersAndPosts.id} />
        </p>
      </div>
    </Wrapper>
  </div>
);

export default React.memo(Banner);
