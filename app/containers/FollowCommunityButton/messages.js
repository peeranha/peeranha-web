/*
 * FollowCommunityButton Messages
 *
 * This contains all the text for the FollowCommunityButton component.
 */

import { defineMessages } from 'react-intl';
import { UNFOLLOW_BUTTON, FOLLOW_BUTTON } from './constants';

export default defineMessages({
  header: {
    id: 'app.containers.FollowCommunityButton.header',
  },
  [FOLLOW_BUTTON]: {
    id: 'app.containers.FollowCommunityButton.subscribe',
  },
  [UNFOLLOW_BUTTON]: {
    id: 'app.containers.FollowCommunityButton.unsubscribe',
  },
  subscribeToThisCommunity: {
    id: 'app.containers.FollowCommunityButton.subscribeToThisCommunity',
  },
});
