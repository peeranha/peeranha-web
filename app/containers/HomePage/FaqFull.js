/*
 * Landing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Seo from 'components/Seo';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { sendEmail } from './actions';
import { EMAIL_FIELD } from './constants';
import * as homepageSelectors from './selectors';

import messages from './messages';

import Header from './Header';
import FaqMain from './FaqMain';
import Footer from './Footer';

const Box = styled.div`
  .get-more-answers {
    display: none;
  }
`;

export class FaqFull extends React.PureComponent {
  sendEmail = (...args) => {
    const { reset, form } = args[2];
    const formData = {
      email: args[0].get(EMAIL_FIELD),
    };

    const pageInfo = {
      url: window.location.href,
      name: `${
        translationMessages[this.props.locale][messages.faqTitle.id]
      } | ${form}`,
    };

    this.props.sendEmailDispatch(formData, reset, pageInfo);
  };

  render() /* istanbul ignore next */ {
    const translations = translationMessages[this.props.locale];

    return (
      <Box id="landing-id">
        <Seo
          title={translations[messages.faqTitle.id]}
          description={translations[messages.faqDescription.id]}
          language={this.props.locale}
        />

        <Header
          sendEmailLoading={this.props.sendEmailLoading}
          sendEmail={this.sendEmail}
          translations={translations}
        />

        <FaqMain />

        <Footer />
      </Box>
    );
  }
}

FaqFull.propTypes = {
  locale: PropTypes.string,
  sendEmailDispatch: PropTypes.func,
  sendEmailLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  sendEmailLoading: homepageSelectors.selectSendEmailLoading(),
});

export function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    dispatch,
    sendEmailDispatch: (formData, reset, pageInfo) =>
      dispatch(sendEmail(formData, reset, pageInfo)),
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
)(FaqFull);
