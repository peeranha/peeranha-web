/**
 *
 * ChangeLocale
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import styled from 'styled-components';

import { translationMessages } from 'i18n';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

const Box = styled.span`
  button {
    cursor: pointer;
    outline: none;
    .locale {
      color: #282828;
      font-size: 16px;
      padding: 0 10px;
    }
    .caret {
      color: #a6a6a6;
      font-size: 12px;
    }
  }
  li {
    border-bottom: 1px solid #a6a6a6;
    :hover {
      cursor: pointer;
      background: #a6a6a6;
    }
  }
`;

/* eslint global-require: 1 */
/* eslint-disable react/prefer-stateless-function */
export class ChangeLocale extends React.PureComponent {
  state = {
    languages: [],
  };

  /* eslint react/no-did-mount-set-state: 0 */
  componentWillMount() {
    const languages = Object.keys(translationMessages);
    this.setState({ languages });
  }

  changeLocaleHandler = e => {
    this.props.changeLocaleDispatch(e.target.dataset.item);
  };

  mapLanguages = langs =>
    langs.map(item => (
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

  render() {
    const { locale } = this.props;

    return (
      <Box className="dropdown">
        <button
          type="button"
          id="dropdownMenu1"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <img src={require(`images/${[locale]}_lang.png`)} alt="" />
          <span className="locale">{locale}</span>
          <span className="caret">▾</span>
        </button>
        <ul className="dropdown-menu p-0" aria-labelledby="dropdownMenu1">
          {this.mapLanguages(this.state.languages)}
        </ul>
      </Box>
    );
  }
}

ChangeLocale.propTypes = {
  changeLocaleDispatch: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeLocaleDispatch: lang => dispatch(changeLocale(lang)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangeLocale);
