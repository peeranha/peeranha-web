/**
 *
 * ErrorBoundary
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translationMessages } from 'i18n';
import { createStructuredSelector } from 'reselect';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import messages from './messages';
import ErrorBoundaryPage from './ErrorBoundaryPage';

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  reloadApp = () => {
    document.location.href = '/';
  };

  render() {
    const translations = translationMessages[this.props.locale];
    const sendProps = {
      error: this.state.error,
      errorInfo: this.state.errorInfo,
      reloadApp: this.reloadApp,
      translations,
    };

    return [
      sendProps.error || sendProps.errorInfo ? (
        <div key="errorBoundary">
          <Helmet>
            <title>{translations[messages.title.id]}</title>
            <meta
              name="description"
              content={translations[messages.description.id]}
            />
          </Helmet>
          <ErrorBoundaryPage {...sendProps} />
        </div>
      ) : (
        React.Children.only(this.props.children)
      ),
    ];
  }
}

ErrorBoundary.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(ErrorBoundary);
