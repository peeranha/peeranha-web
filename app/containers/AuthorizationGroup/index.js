/**
 *
 * AuthorizationGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import createdHistory from 'createdHistory';

import Button from 'containers/Button';
import { makeSelectEosInit } from 'containers/AccountInitializer/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AuthorizationGroup extends React.Component {
  render() {
    const { eosInit } = this.props;
    const logged =
      eosInit && eosInit.selectedScatterAccount && eosInit.userIsInSystem;

    return (
      <div>
        {logged && (
          <Button
            buttonAction={() =>
              createdHistory.push(`/users/${eosInit.selectedScatterAccount}`)
            }
            buttonClass="btn btn-secondary my-2 my-sm-0"
            buttonContent="Profile"
          />
        )}

        {!logged && (
          <Button
            buttonAction={() => console.log('Action')}
            buttonClass="btn btn-success my-2 my-sm-0"
            buttonContent="Log In"
          />
        )}
      </div>
    );
  }
}

AuthorizationGroup.propTypes = {
  eosInit: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  eosInit: makeSelectEosInit(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthorizationGroup);
