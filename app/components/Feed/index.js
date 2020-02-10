import React from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { NotFoundPage } from 'containers/App/imports';
import { makeSelectAccount } from 'containers/AccountProvider/selectors';

const Feed = ({ match, account }) =>
  account ? (
    <Questions parentPage={routes.feed()} match={match} />
  ) : (
    <NotFoundPage />
  );

Feed.propTypes = {
  match: PropTypes.object,
  account: PropTypes.string,
};

export default compose(
  connect(state => ({
    account: makeSelectAccount()(state),
  })),
)(Feed);
