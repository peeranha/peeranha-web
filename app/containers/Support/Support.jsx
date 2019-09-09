import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import BaseTransparent from 'components/Base/BaseTransparent';
import Header from 'components/Header/Transparent';
import AsideBG from 'components/Base/AsideBG';

import { FORM_ID } from './constants';

import FaqSections from './FaqSections';
import CallToLeaveMessage from './CallToLeaveMessage';
import SendMessageForm from './SendMessageForm';

const Support = ({ faq, locale, sendMessage, sendMessageLoading }) => (
  <div id={FORM_ID}>
    <Header>
      <H3>
        <FormattedMessage {...commonMessages.support} />
      </H3>
    </Header>

    <Base className="p-0">
      <div className="d-flex">
        <div className="flex-grow-1">
          <BaseTransparent>
            <CallToLeaveMessage />

            <SendMessageForm
              locale={locale}
              sendMessage={sendMessage}
              sendMessageLoading={sendMessageLoading}
            />
          </BaseTransparent>
        </div>

        <AsideBG className="d-none d-xl-block">
          <FaqSections faq={faq} />
        </AsideBG>
      </div>
    </Base>
  </div>
);

Support.propTypes = {
  faq: PropTypes.array,
  locale: PropTypes.string,
  sendMessage: PropTypes.func,
  sendMessageLoading: PropTypes.bool,
};

export default React.memo(Support);
