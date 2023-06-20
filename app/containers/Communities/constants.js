export const GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID =
  'app_Communities_GO_TO_CREATE_COMMUNITY_SCREEN_BUTTON_ID';

const communityIdsArray = (ids) =>
  ids ? ids.split(',').map((communityIdStr) => parseInt(communityIdStr, 10)) : [];

export const SUBCOMMUNITY_IDS_ARRAY = communityIdsArray(process.env.SUBCOMMUNITY_IDS);

export const HIDDEN_COMMUNITIES_ID = communityIdsArray(process.env.HIDDEN_COMMUNITIES_ID);
