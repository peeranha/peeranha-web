/*
 * SuggestedCommunities Messages
 *
 * This contains all the text for the SuggestedCommunities component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.SuggestedTags.title',
    defaultMessage: 'Suggested tags',
  },
  description: {
    id: 'app.containers.SuggestedTags.description',
    defaultMessage: 'Suggested tags | Description',
  },
  youHaveAlreadyVoted: {
    id: 'app.containers.SuggestedTags.youHaveAlreadyVoted',
    defaultMessage: 'You have already voted',
  },
  creatorCannotUpvoteOwnComm: {
    id: 'app.containers.SuggestedTags.creatorCannotUpvoteOwnComm',
    defaultMessage: 'Creator cannot upvote own tag',
  },
  noSuggestedTags: {
    id: 'app.containers.SuggestedTags.noSuggestedTags',
    defaultMessage: 'There are no suggested tags',
  },
});
