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
      letter-spacing: -0.6px;
      text-transform: uppercase;
      vertical-align: 1px;
    }

    .caret {
      color: #a6a6a6;
      font-size: 12px;
      display: inline-block;
      transition: 0.5s;
      transform: rotate(180deg);
      vertical-align: 2px;
    }

    :hover .locale {
      color: #5c78d7;
    }
  }

  button[aria-expanded='true'] .caret {
    transform: rotate(180deg);
  }

  button[aria-expanded='false'] .caret {
    transform: rotate(0deg);
  }

  ul {
    box-shadow: -2px 2px 5px #b9b9b9;
  }

  li {
    font-family: OpenSans;
    padding: 5px 20px !important;
    text-transform: uppercase;

    img {
      margin-right: 5px;
    }

    :hover {
      cursor: pointer;
      background: rgba(229, 229, 229, 0.5);
    }
  }

  li[data-isbold='true'] {
    font-weight: bold;
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

  mapLanguages = langs =>
    langs.map(item => (
      <li
        className="pl-2"
        role="presentation"
        onClick={() => this.props.changeLocaleDispatch(item)}
        data-isbold={item === this.props.locale}
        key={item}
      >
        <img src={require(`images/${item}_lang.png`)} alt="" />
        <span>{item}</span>
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
          aria-expanded="false"
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
