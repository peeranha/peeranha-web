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
import ErrorBoundaryMessage from './ErrorBoundaryMessage';

/* eslint-disable react/prefer-stateless-function */
export class ErrorBoundary extends React.PureComponent {
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
    const { locale, children } = this.props;
    const { error, errorInfo } = this.state;
    const translations = translationMessages[locale];

    const sendProps = {
      error,
      errorInfo,
      reloadApp: this.reloadApp,
      translations,
    };

    return (
      <React.Fragment>
        {error || errorInfo ? (
          <div>
            <Helmet>
              <title>{translations[messages.title.id]}</title>
              <meta
                name="description"
                content={translations[messages.description.id]}
              />
            </Helmet>
            <ErrorBoundaryMessage {...sendProps} />
          </div>
        ) : (
          React.Children.only(children)
        )}
      </React.Fragment>
    );
  }
}

ErrorBoundary.propTypes = {
  locale: PropTypes.string,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(ErrorBoundary);
