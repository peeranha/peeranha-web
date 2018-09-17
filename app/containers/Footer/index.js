/**
 *
 * Footer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import Wrapper from './styledComponents/wrapper';

/* eslint-disable react/prefer-stateless-function */
export class Footer extends React.Component {
  render() {
    const CURRENT_YEAR = new Date().getFullYear();
    return (
      <Wrapper className="page-footer font-small blue">
        <div className="footer-copyright text-center py-3">
          © {CURRENT_YEAR} Copyright:
          <Link to="/" href="/">
            Peerania
          </Link>
        </div>
      </Wrapper>
    );
  }
}

Footer.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Footer);
