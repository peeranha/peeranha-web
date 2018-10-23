/**
 *
 * UserAuthNavLinks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import createdHistory from 'createdHistory';

import {
  makeSelectUserIsInSystem,
  makeSelectAccount,
} from 'containers/AccountInitializer/selectors';
import { showSignUpModal } from 'containers/SignUp/actions';
import { showLoginModal } from 'containers/Login/actions';

import UserAuthNavLinksComponent from './UserAuthNavLinksComponent';
import UserProfileNav from './UserProfileNav';

/* eslint-disable react/prefer-stateless-function */
export class UserAuthNavLinks extends React.Component {
  showSignUpModal = () => this.props.showSignUpModalDispatch();

  showLoginModal = () => this.props.showLoginModalDispatch();

  pushToProfile = () => createdHistory.push(`/users/${this.props.account}`);

  render() {
    const { account, userIsInSystem } = this.props;
    const logged = account && userIsInSystem;

    return (
      <div className="auth-button-group">
        {logged && <UserProfileNav pushToProfile={this.pushToProfile} />}

        {!logged && (
          <UserAuthNavLinksComponent
            showSignUpModal={this.showSignUpModal}
            showLoginModal={this.showLoginModal}
          />
        )}
      </div>
    );
  }
}

UserAuthNavLinks.propTypes = {
  userIsInSystem: PropTypes.bool.isRequired,
  showSignUpModalDispatch: PropTypes.func.isRequired,
  showLoginModalDispatch: PropTypes.func.isRequired,
  account: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userIsInSystem: makeSelectUserIsInSystem(),
  account: makeSelectAccount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    showSignUpModalDispatch: () => dispatch(showSignUpModal()),
    showLoginModalDispatch: () => dispatch(showLoginModal()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAuthNavLinks);
