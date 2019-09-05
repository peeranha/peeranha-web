/**
 *
 * Support
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { scrollToSection } from 'utils/animation';

import reducer from 'containers/HomePage/reducer';
import saga from 'containers/HomePage/saga';
import { sendMessage } from 'containers/HomePage/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { selectFaq } from 'containers/DataCacheProvider/selectors';
import { selectSendMessageLoading } from 'containers/HomePage/selectors';

import Seo from 'components/Seo';

import ContactsSection from './Contacts';
import SupportSection from './Support';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class Support extends React.PureComponent {
  componentDidUpdate() {
    scrollToSection();
  }

  render() {
    const { locale, sendMessageDispatch, faq, sendMessageLoading } = this.props;
    const translations = translationMessages[locale];

    return (
      <div>
        <Seo
          title={translations[messages.title.id]}
          description={translations[messages.description.id]}
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
  }
}

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
    sendMessageDispatch: (...args) => dispatch(sendMessage(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Support);
