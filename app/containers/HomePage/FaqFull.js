/*
 * Landing
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { translationMessages } from 'i18n';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { EMAIL_FIELD } from './constants';

import { sendEmail } from './actions';

import messages from './messages';

import Header from './Header';
import FaqMain from './FaqMain';
import Footer from './Footer';

const Box = styled.div`
  .get-more-answers {
    display: none;
  }
`;

class FaqFull extends React.PureComponent {
  sendEmail = (...args) => {
    const { reset, form } = args[2];
    const formData = {
      email: args[0].get(EMAIL_FIELD),
    };

    const pageInfo = {
      url: window.location.href,
      name: `${messages.faqTitle.defaultMessage} | ${form}`,
    };

    this.props.sendEmailDispatch(formData, reset, pageInfo);
  };

  render() {
    const translations = translationMessages[this.props.locale];

    return (
      <Box>
        <Helmet>
          <title>{translations[messages.faqTitle.id]}</title>
          <meta
            name="description"
            content={translations[messages.faqDescription.id]}
          />
        </Helmet>

        <Header sendEmail={this.sendEmail} />
        <FaqMain />
        <Footer />
      </Box>
    );
  }
}

FaqFull.propTypes = {
  locale: PropTypes.string,
  sendEmailDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
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
