import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';

import letterSmile from 'images/letter-smile.svg?inline';

import Banner from 'components/Banner/Transparent';

import messages from './messages';

const BannerStyled = Banner.extend`
  border-bottom: 1px solid ${BORDER_SECONDARY};
  padding: 20px 0 50px;
  height: 200px;
  margin-bottom: 20px;

  @media only screen and (max-width: 576px) {
    border-bottom: none;
    padding: 0;
  }
`;

export default React.memo(() => (
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
));
