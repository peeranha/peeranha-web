import React, { memo } from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  makeSelectAccount,
  makeSelectAccountLoading,
} from 'containers/AccountProvider/selectors';

import WidthCentered from '../LoadingIndicator/WidthCentered';
import { POST_TYPE } from '../../utils/constants';

const Feed = ({ match, account, loading }) => {
  if (loading) {
    return <WidthCentered />;
  } else if (account) {
    return (
      <Questions
        parentPage={routes.feed()}
        match={match}
        postsTypes={[
          POST_TYPE.generalPost,
          POST_TYPE.expertPost,
          POST_TYPE.tutorial,
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
    connect(state => ({
      account: makeSelectAccount()(state),
      loading: makeSelectAccountLoading()(state),
    })),
  )(Feed),
);
