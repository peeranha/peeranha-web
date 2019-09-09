import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';

import letterSmile from 'images/letter-smile.svg?inline';

import Banner from 'components/Banner/Transparent';

import messages from './messages';

const BannerStyled = Banner.extend`
  border-bottom: 1px solid ${BORDER_SECONDARY};
`;

const CallToLeaveMessage = () => (
  <BannerStyled>
    <img src={letterSmile} alt="leave-message" />
    <div>
      <p>
        <FormattedMessage {...messages.feelFreeToAsk} />
      </p>
      <p>
        <FormattedMessage {...messages.alsoWeHighly} />
      </p>
    </div>
  </BannerStyled>
);

export default React.memo(CallToLeaveMessage);
