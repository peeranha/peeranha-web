/**
 *
 * Header
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHeader from './selectors';
import reducer from './reducer';
import saga from './saga';

import Wrapper from './styledComponents/wrapper';
import Logo from './styledComponents/logo';
import ListItem from './styledComponents/listItem';
import SearchForm from './styledComponents/searchForm';
import SearchFormInput from './styledComponents/searchFormInput';

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  /* 
  * signFunction method handles sign operations 
  */

  signFunction(e) {
    e.preventDefault();
    console.log('signFunction');
  }

  render() {
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
              <ListItem className="nav-item">
                <Link to="/" className="nav-link" href="/">
                  Home
                </Link>
              </ListItem>

              <ListItem className="nav-item">
                <Link to="/profile" className="nav-link" href="/profile">
                  Profile
                </Link>
              </ListItem>

              <ListItem className="nav-item">
                <Link to="/about" className="nav-link" href="/about">
                  About
                </Link>
              </ListItem>

              <ListItem className="nav-item">
                <Link to="/help" className="nav-link" href="/help">
                  Help
                </Link>
              </ListItem>
            </ul>

            <SearchForm className="form-inline my-2 my-lg-2">
              <SearchFormInput
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
              />
              <button
                className="btn btn-outline-success mr-sm-2 my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
              <button
                className="btn btn-success my-2 my-sm-0"
                onClick={e => this.signFunction(e)}
              >
                Sign In
              </button>
            </SearchForm>
          </div>
        </nav>
      </Wrapper>
    );
  }
}

Header.propTypes = {};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'header', reducer });
const withSaga = injectSaga({ key: 'header', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Header);
