import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import TopCommunities from 'components/TopCommunities';

import Header from './Header';
import Content from './Content';

const feed = routes.feed();

/* eslint indent: 0 */
export const View = props => (
  <React.Fragment>
    <Header {...props} />

    {props.parentPage === feed && (
      <TopCommunities
        userId={props.account}
        account={props.account}
        communities={props.communities}
        profile={props.profile}
      />
    )}

    <Content {...props} />

    {(props.questionsLoading || props.communitiesLoading) && (
      <LoadingIndicator />
    )}
  </React.Fragment>
);

View.propTypes = {
  questionsList: PropTypes.array,
  followedCommunities: PropTypes.array,
  communities: PropTypes.array,
  questionsLoading: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  parentPage: PropTypes.string,
  account: PropTypes.string,
  profile: PropTypes.object,
};

export default React.memo(View);
