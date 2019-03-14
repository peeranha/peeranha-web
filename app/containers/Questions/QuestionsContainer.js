import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import TopCommunities from 'components/TopCommunities';

import NoQuestions from './NoQuestions';
import QuestionsHeader from './QuestionsHeader';
import QuestionsContent from './QuestionsContent';

const feed = routes.feed();

/* eslint indent: 0 */
const QuestionsContainer = props => (
  <div>
    <QuestionsHeader {...props} />

    {!props.questionsList.length &&
      !props.questionsLoading &&
      !props.communitiesLoading && (
        <NoQuestions
          isFeed={props.parentPage === feed}
          followedCommunities={props.followedCommunities}
        />
      )}

    {props.parentPage === feed && (
      <TopCommunities
        userId={props.account}
        account={props.account}
        communities={props.communities}
        profile={props.profile}
      />
    )}

    <QuestionsContent {...props} />

    {(props.questionsLoading || props.communitiesLoading) && (
      <LoadingIndicator />
    )}
  </div>
);

QuestionsContainer.propTypes = {
  questionsList: PropTypes.array,
  followedCommunities: PropTypes.array,
  communities: PropTypes.array,
  questionsLoading: PropTypes.bool,
  communitiesLoading: PropTypes.bool,
  parentPage: PropTypes.string,
  account: PropTypes.string,
  profile: PropTypes.object,
};

export default React.memo(QuestionsContainer);
