import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Header from 'components/Header/Transparent';

import { FORM_ID } from './constants';

import FaqSections from './FaqSections';
import Banner from './Banner';
import SendMessageForm from './SendMessageForm';

const Support = ({ faq, locale, sendMessage, sendMessageLoading }) => {
  const { t } = useTranslation();

  return (
    <div id={FORM_ID}>
      <Header>
        <H3>{t('common.support')}</H3>
      </Header>

      <TipsBase className="overflow-hidden">
        <BaseSpecialOne>
          <Banner />
          <BaseSpecialOne nullMobilePadding>
            <SendMessageForm
              locale={locale}
              sendMessage={sendMessage}
              sendMessageLoading={sendMessageLoading}
            />
          </BaseSpecialOne>
        </BaseSpecialOne>

        <FaqSections faq={faq} />
      </TipsBase>
    </div>
  );
};

Support.propTypes = {
  faq: PropTypes.object,
  locale: PropTypes.string,
  sendMessage: PropTypes.func,
  sendMessageLoading: PropTypes.bool,
};

export default React.memo(Support);
