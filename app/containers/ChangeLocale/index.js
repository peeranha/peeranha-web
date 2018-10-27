/**
 *
 * ChangeLocale
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { translationMessages } from 'i18n';
import { changeLocale } from 'containers/LanguageProvider/actions';

/* eslint-disable react/prefer-stateless-function */
export class ChangeLocale extends React.Component {
  state = {
    languages: [],
  };

  /* eslint react/no-did-mount-set-state: 0 */
  componentWillMount() {
    const languages = Object.keys(translationMessages);
    this.setState({ languages });
  }

  changeLocaleHandler = e =>
    this.props.changeLocaleDispatch(e.target.dataset.item);

  mapLanguages(langs) {
    return langs.map(item => (
      <li
        className="pl-2"
        role="presentation"
        data-item={item}
        onClick={this.changeLocaleHandler}
        key={item}
      >
        {item}
      </li>
    ));
  }

  render() {
    return (
      <span className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <small>Lang</small>
          <span className="caret" />
        </button>
        <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu1">
          {this.mapLanguages(this.state.languages)}
        </ul>
      </span>
    );
  }
}

ChangeLocale.propTypes = {
  changeLocaleDispatch: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLocaleDispatch: lang => dispatch(changeLocale(lang)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangeLocale);
