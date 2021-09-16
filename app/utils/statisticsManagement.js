import { GET_USERS_COUNT } from './ethConstants';

export async function getStat(ethereumService) {
  const usersCount = await ethereumService.getData(GET_USERS_COUNT);
  return { usersCount: Number(usersCount) };
}
