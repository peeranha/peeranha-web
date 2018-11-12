/**
 *
 * UserProfileNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import createdHistory from 'createdHistory';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { makeSelectAccount } from 'containers/AccountProvider/selectors';
import * as routes from 'routes-config';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileNav extends React.Component {
  pushToProfile = () =>
    createdHistory.push(routes.profile_view(this.props.account));

  render() {
    return (
      <button
        onClick={this.pushToProfile}
        className="btn btn-secondary my-2 my-sm-0"
      >
        <FormattedMessage {...messages.profile} />
      </button>
    );
  }
}

UserProfileNav.propTypes = {
  account: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  account: makeSelectAccount(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(UserProfileNav);
