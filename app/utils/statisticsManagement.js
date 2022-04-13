import { GET_COMMUNITIES_COUNT, GET_USERS_COUNT } from './ethConstants';

export async function getStat(ethereumService) {
  console.log('here all');
  const usersCount = await ethereumService.getData(GET_USERS_COUNT);
  const communitiesCount = await ethereumService.getData(GET_COMMUNITIES_COUNT);
  return {
    usersCount: Number(usersCount),
    communitiesCount: Number(communitiesCount),
  };
}
