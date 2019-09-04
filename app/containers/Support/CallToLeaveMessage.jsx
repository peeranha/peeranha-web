import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { BORDER_SECONDARY } from 'style-constants';

import letterSmile from 'images/letter-smile.svg?inline';

import messages from './messages';

const Base = styled.div`
  border-bottom: 2px solid ${BORDER_SECONDARY};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px 50px 50px 50px;

  img {
    padding-right: 50px;
    padding-bottom: 15px;
  }

  h4 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 15px;
  }

  p {
    line-height: 24px;
  }
`;

const CallToLeaveMessage = () => (
  <Base>
    <img src={letterSmile} alt="leave-message" />
    <div>
      <h4>
        <FormattedMessage {...messages.feelFreeToAsk} />
      </h4>
      <p>
        <FormattedMessage {...messages.alsoWeHighly} />
      </p>
    </div>
  </Base>
);

export default React.memo(CallToLeaveMessage);
