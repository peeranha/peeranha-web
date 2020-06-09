import React from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { NotFoundPage } from 'containers/App/imports';
import {
  makeSelectAccount,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import WidthCentered from '../LoadingIndicator/WidthCentered';

const Feed = ({ match, account, loading }) => {
  if (loading) {
    return <WidthCentered />;
  }

  return account ? (
    <Questions parentPage={routes.feed()} match={match} />
  ) : (
    <NotFoundPage />
  );
};

Feed.propTypes = {
  match: PropTypes.object,
  account: PropTypes.string,
  loading: PropTypes.bool,
};

export default compose(
  connect(state => ({
    account: makeSelectAccount()(state),
    loading: makeSelectAccountLoading()(state),
  })),
)(Feed);
