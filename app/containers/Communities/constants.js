export const GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID =
  'app_Communities_GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID';

export const HIDDEN_COMMUNITIES_ID = process.env.HIDDEN_COMMUNITIES_ID
  ? process.env.HIDDEN_COMMUNITIES_ID.split(',').map((communityIdStr) =>
      parseInt(communityIdStr, 10),
    )
  : [];
