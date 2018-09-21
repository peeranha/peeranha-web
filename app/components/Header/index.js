/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import Wrapper from './Wrapper';
import Logo from './Logo';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import SearchFormInput from './SearchFormInput';

/* eslint-disable react/prefer-stateless-function */
const Header = () => {
  const placehld = <FormattedMessage {...messages.search} />;

  return (
    <Wrapper>
      <nav className="container navbar navbar-expand-lg navbar-light">
        <Link to="/" href="/">
          <Logo />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <ListItem className="nav-item">
              <Link to="/" className="nav-link" href="/">
                <FormattedMessage {...messages.home} />
              </Link>
            </ListItem>

            <ListItem className="nav-item">
              <Link to="/profile" className="nav-link" href="/profile">
                <FormattedMessage {...messages.profile} />
              </Link>
            </ListItem>

            <ListItem className="nav-item">
              <Link to="/about" className="nav-link" href="/about">
                <FormattedMessage {...messages.about} />
              </Link>
            </ListItem>

            <ListItem className="nav-item">
              <Link to="/help" className="nav-link" href="/help">
                <FormattedMessage {...messages.help} />
              </Link>
            </ListItem>
          </ul>

          <SearchForm className="form-inline my-2 my-lg-2">
            <SearchFormInput
              className="form-control mr-sm-2"
              type="search"
              placeholder={placehld.props.defaultMessage}
            />
            <button
              className="btn btn-outline-success mr-sm-2 my-2 my-sm-0"
              type="submit"
            >
              <FormattedMessage {...messages.search} />
            </button>
            <Link to="/sign" href="/sign">
              <button className="btn btn-success my-2 my-sm-0">
                <FormattedMessage {...messages.signIn} />
              </button>
            </Link>
          </SearchForm>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Header;
