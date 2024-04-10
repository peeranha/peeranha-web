import React, { memo } from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { POST_TYPE } from 'utils/constants';

import { makeSelectAccount, makeSelectAccountLoading } from 'containers/AccountProvider/selectors';

import WidthCentered from '../LoadingIndicator/WidthCentered';

const Feed = ({ match, account, loading }) => {
  if (loading) {
    return <WidthCentered />;
  }
  if (account) {
    return (
      <Questions
        parentPage={routes.feed()}
        match={match}
        postsTypes={[
          POST_TYPE.generalPost,
          POST_TYPE.expertPost,
          POST_TYPE.tutorial,
          POST_TYPE.autoscraped,
        ]}
      />
    );
  }
  return (
    <Questions
      parentPage={routes.home()}
      match={match}
      postsTypes={[
        POST_TYPE.generalPost,
        POST_TYPE.expertPost,
        POST_TYPE.tutorial,
        POST_TYPE.autoscraped,
      ]}
    />
  );
};

Feed.propTypes = {
  match: PropTypes.object,
  account: PropTypes.string,
  loading: PropTypes.bool,
};

export default memo(
  compose(
    connect((state) => ({
      account: makeSelectAccount()(state),
      loading: makeSelectAccountLoading()(state),
    })),
  )(Feed),
);
