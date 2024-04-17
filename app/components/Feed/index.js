import React, { memo } from 'react';
import * as routes from 'routes-config';
import Questions from 'containers/Questions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { POST_TYPE } from 'utils/constants';

import { makeSelectAccount, makeSelectAccountLoading } from 'containers/AccountProvider/selectors';

import WidthCentered from '../LoadingIndicator/WidthCentered';

const single = isSingleCommunityWebsite();
const defaultPostTypeArray = [POST_TYPE.generalPost, POST_TYPE.expertPost, POST_TYPE.tutorial];
const singleModePostTypeArray = [...defaultPostTypeArray, POST_TYPE.autoscraped];

const Feed = ({ match, account, loading }) => {
  if (loading) {
    return <WidthCentered />;
  }
  if (account) {
    return (
      <Questions
        parentPage={routes.feed()}
        match={match}
        postsTypes={single ? singleModePostTypeArray : defaultPostTypeArray}
      />
    );
  }
  return (
    <Questions
      parentPage={routes.home()}
      match={match}
      postsTypes={single ? singleModePostTypeArray : defaultPostTypeArray}
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
