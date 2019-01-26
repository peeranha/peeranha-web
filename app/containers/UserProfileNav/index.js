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

import Button from 'components/Button';

import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class UserProfileNav extends React.PureComponent {
  pushToProfile = () => {
    createdHistory.push(routes.profile_view(this.props.account));
  };

  render() {
    return (
      <Button onClick={this.pushToProfile}>
        <FormattedMessage {...messages.profile} />
      </Button>
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
