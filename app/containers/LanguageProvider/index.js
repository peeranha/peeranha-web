import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
// import { translationMessages } from 'i18n';

import { makeSelectLocale } from './selectors';
import { changeLocale } from './actions';

/* eslint prefer-destructuring: 0  */
export class LanguageProvider extends React.PureComponent {
  /* TODO: Uncomment if will be more than 1 lang. */

  // componentWillMount() {
  //   const languages = Object.keys(translationMessages);
  //   let locale = localStorage.getItem('locale');

  //   // if (!locale) - find the first suitable language in window.navigator.languages
  //   if (!locale) {
  //     locale = window.navigator.languages.filter(x => languages.includes(x))[0];
  //   }

  //   if (locale) {
  //     this.props.changeLocaleDispatch(locale);
  //   }
  // }

  render() {
    return (
      <IntlProvider
        locale={this.props.locale}
        key={this.props.locale}
        messages={this.props.messages[this.props.locale]}
      >
        {this.props.children}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element,
  // changeLocaleDispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    changeLocaleDispatch: bindActionCreators(changeLocale, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageProvider);
