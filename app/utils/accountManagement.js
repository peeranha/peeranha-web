import { getCommunityRole } from 'utils/properties';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  COMMUNITY_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
} from './constants';

import { ApplicationError } from './errors';
import { dateNowInSeconds } from './datetime';
import {
  CONTRACT_USER,
  GIVE_COMMUNITY_ADMIN_PERMISSION,
  GIVE_COMMUNITY_MODERATOR_PERMISSION,
  IS_USER_EXISTS,
  REVOKE_COMMUNITY_ADMIN_PERMISSION,
  REVOKE_COMMUNITY_MODERATOR_PERMISSION,
} from './ethConstants';

const addRolePermissionEthConstants = [
  GIVE_COMMUNITY_ADMIN_PERMISSION,
  GIVE_COMMUNITY_MODERATOR_PERMISSION,
];

const revokeRolePermissionEthConstants = [
  REVOKE_COMMUNITY_ADMIN_PERMISSION,
  REVOKE_COMMUNITY_MODERATOR_PERMISSION,
];

export const emptyProfile = (account) => ({
  achievements: [],
  answersGiven: 0,
  avatar: undefined,
  balance: 0,
  boost: null,
  creationTime: 0,
  displayName: `${account.substring(0, 6)}...${account.substring(account.length - 4)}`,
  followedCommunities: [],
  highestRating: 0,
  id: account,
  loginData: { loginWithMetaMask: true },
  permissions: [],
  postCount: 0,
  profile: {},
  rating: undefined,
  ratings: [],
  stakedInCurrentPeriod: null,
  stakedInNextPeriod: null,
  user: account,
});

export async function giveRolePermission(user, userToGive, role, communityId, ethereumService) {
  await ethereumService.sendTransaction(
    CONTRACT_USER,
    user,
    addRolePermissionEthConstants[role],
    [user, userToGive, communityId],
    2,
  );
}

export async function revokeRolePermission(user, userToRevoke, role, communityId, ethereumService) {
  await ethereumService.sendTransaction(
    CONTRACT_USER,
    user,
    revokeRolePermissionEthConstants[role],
    [user, userToRevoke, communityId],
    2,
  );
}

export const isUserExists = async (userAddress, ethereumService) => {
  if (!userAddress) throw new ApplicationError('No profile');

  return await ethereumService.getUserDataWithArgs(IS_USER_EXISTS, [userAddress]);
};

export const updateAcc = async (profile, ethereumService) => {
  if (!profile) throw new ApplicationError('No profile');

  const currentTime = dateNowInSeconds();
  // const currentPeriod = Math.floor(
  //   (currentTime - profile.creationTime) /
  //     process.env.ACCOUNT_STAT_RESET_PERIOD,
  // );

  // const periodsHavePassed = currentPeriod - profile.last_update_period;
  // const integerProperties = profile?.integer_properties ?? [];
  // const lastUpdateTime = integerProperties.find(
  //   prop => prop.key === KEY_LAST_RATING_UPDATE_TIME,
  // )?.value;
  // const timeSinceRatingUpdate = currentTime - lastUpdateTime;

  // if (
  //   periodsHavePassed > 0 ||
  //   timeSinceRatingUpdate >= process.env.ACCOUNT_STAT_RESET_PERIOD
  // ) {
  //   await eosService.sendTransaction(profile.user, UPDATE_ACC, {
  //     user: profile.user,
  //   });
  // } else {
  //   // throw new ApplicationError('Period is not finished');
  // }
};

export const isUserInSystem = async (user, eosService) => {
  const profile = await eosService.getTableRow(ACCOUNT_TABLE, ALL_ACCOUNTS_SCOPE, user);

  return Boolean(profile);
};

export const inviteUser = async (accountName, referralCode, eosService) => {};

export const checkUserURL = (user) => {
  const path = document.location.pathname.split('/');
  const userInURL = path[1] === 'users' ? path[2] : undefined;
  return userInURL ? userInURL === user : true;
};

export const getUsersModeratorByRoles = (usersModerator, communityId, moderators, Roles) =>
  usersModerator.map((user) => {
    const moderatorPermission = moderators.find(
      (moderator) =>
        moderator.permission === getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId) &&
        moderator.user.id === user.id,
    );
    const adminPermission = moderators.find(
      (moderator) =>
        moderator.permission === getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId) &&
        moderator.user.id === user.id,
    );

    const userRoles = [];
    if (moderatorPermission) userRoles.push(Roles.communityModerator);
    if (adminPermission) userRoles.push(Roles.communityAdmin);
    return { user, userRoles };
  });
