import { GET_COMMUNITIES_COUNT, GET_USERS_COUNT } from './ethConstants';

export async function getStat(ethereumService) {
  // const usersCount = await ethereumService.getUserDataWithArgs(
  //   GET_USERS_COUNT,
  //   [],
  // );
  // const communitiesCount = await ethereumService.getCommunityDataWithArgs(
  //   GET_COMMUNITIES_COUNT,
  //   [],
  // );
  return {
    usersCount: undefined,
    communitiesCount: undefined,
  };
}
