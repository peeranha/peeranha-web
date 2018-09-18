/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Wrapper from './Wrapper';
import Logo from './Logo';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import SearchFormInput from './SearchFormInput';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
const Header = () => {
  const MSG_KEYS = Object.keys(messages);
  return (
    <Wrapper className="col-xl-8 col-lg-10">
      <nav className="navbar navbar-expand-lg navbar-light">
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
            {MSG_KEYS.map(
              item =>
                messages[item].mark === 'tab' && (
                  <ListItem className="nav-item" key={messages[item].tabCode}>
                    <Link
                      to={messages[item].link}
                      className="nav-link"
                      href={messages[item]}
                    >
                      {messages[item].defaultMessage}
                    </Link>
                  </ListItem>
                ),
            )}
          </ul>

          <SearchForm className="form-inline my-2 my-lg-2">
            <SearchFormInput
              className="form-control mr-sm-2"
              type="search"
              placeholder={messages.search.defaultMessage}
            />
            <button
              className="btn btn-outline-success mr-sm-2 my-2 my-sm-0"
              type="submit"
            >
              {messages.search.defaultMessage}
            </button>
            <Link to="/sign" href="/sign">
              <button className="btn btn-success my-2 my-sm-0">
                {messages.signIn.defaultMessage}
              </button>
            </Link>
          </SearchForm>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Header;
