/*
 * SuggestedCommunities Messages
 *
 * This contains all the text for the SuggestedCommunities component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.SuggestedCommunities.title',
    defaultMessage: 'Suggested communities',
  },
  description: {
    id: 'app.containers.SuggestedCommunities.description',
    defaultMessage: 'Suggested communities | Description',
  },
  youHaveAlreadyVoted: {
    id: 'app.containers.SuggestedCommunities.youHaveAlreadyVoted',
    defaultMessage: 'You have already voted',
  },
  creatorCannotUpvoteOwnComm: {
    id: 'app.containers.SuggestedCommunities.creatorCannotUpvoteOwnComm',
    defaultMessage: 'Creator cannot upvote own community',
  },
  noSuggestedCommunities: {
    id: 'app.containers.SuggestedCommunities.noSuggestedCommunities',
    defaultMessage: 'There are no suggested communities',
  },
});
