import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from 'pages/HomePage/reducer';
import saga from 'pages/HomePage/saga';
import { sendMessage } from 'pages/HomePage/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';
import { selectSendMessageLoading } from 'pages/HomePage/selectors';

import Seo from 'components/Seo';

import ContactsSection from './Contacts';
import SupportSection from './Support';

const Support = ({ locale, sendMessageDispatch, faq, sendMessageLoading }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Seo
        title={t('common.supportDesc.title')}
        description={t('common.supportDesc.description')}
        language={locale}
        index={false}
      />

      <ContactsSection locale={locale} />
      <SupportSection
        sendMessage={sendMessageDispatch}
        faq={faq}
        locale={locale}
        sendMessageLoading={sendMessageLoading}
      />
    </div>
  );
};

Support.propTypes = {
  locale: PropTypes.string,
  sendMessageDispatch: PropTypes.func,
  faq: PropTypes.object,
  sendMessageLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  faq: selectFaq(),
  sendMessageLoading: selectSendMessageLoading(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    sendMessageDispatch: bindActionCreators(sendMessage, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(withReducer, withSaga, withConnect)(Support);
