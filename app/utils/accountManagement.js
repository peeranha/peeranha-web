import { getActualId, getCommunityRole, getNetwork } from 'utils/properties';
import { getUser } from 'utils/queries/ethereumService';

import { COMMUNITY_ADMIN_ROLE, COMMUNITY_MODERATOR_ROLE } from './constants';

import { ApplicationError } from './errors';
import { BAN_COMMUNITY_USER, CONTRACT_USER, UNBAN_COMMUNITY_USER } from './queries/constants';

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

export async function giveRolePermission(user, userToGive, action, communityId, ethereumService) {
  await ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_USER[getNetwork(communityId)],
    user,
    action,
    [user, userToGive, getActualId(communityId)],
    2,
  );
}

export async function revokeRolePermission(
  user,
  userToRevoke,
  action,
  communityId,
  ethereumService,
) {
  await ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_USER[getNetwork(communityId)],
    user,
    action,
    [user, userToRevoke, getActualId(communityId)],
    2,
  );
}

export const banUser = async (user, userToBan, communityId, ethereumService) => {
  await ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_USER[getNetwork(communityId)],
    user,
    BAN_COMMUNITY_USER,
    [user, userToBan, Number(getActualId(communityId))],
  );
};

export const unbanUser = async (user, userToBan, communityId, ethereumService) => {
  await ethereumService.sendTransaction(
    getNetwork(communityId),
    CONTRACT_USER[getNetwork(communityId)],
    user,
    UNBAN_COMMUNITY_USER,
    [user, userToBan, Number(getActualId(communityId))],
  );
};

export const isUserExists = async (userAddress) => {
  if (!userAddress) throw new ApplicationError('No profile');
  const profileInfo = await getUser(userAddress);
  return Object.keys(profileInfo).length !== 0;
};

export const updateAcc = async (profile) => {
  if (!profile) throw new ApplicationError('No profile');
};

export const checkUserURL = (user) => {
  const path = document.location.pathname.split('/');
  const userInURL = path[1] === 'users' ? path[2] : undefined;
  return userInURL ? userInURL === user : true;
};

export const getUsersModeratorByRoles = (usersModerator, communityId, moderators, Roles) =>
  usersModerator.map((user) => {
    const moderatorPermission = moderators.find(
      (moderator) =>
        moderator.permission ===
          getCommunityRole(
            COMMUNITY_MODERATOR_ROLE,
            getActualId(communityId),
            getNetwork(communityId),
          ) && moderator.user.id === user.id,
    );
    const adminPermission = moderators.find(
      (moderator) =>
        moderator.permission ===
          getCommunityRole(
            COMMUNITY_ADMIN_ROLE,
            getActualId(communityId),
            getNetwork(communityId),
          ) && moderator.user.id === user.id,
    );

    const userRoles = [];
    if (moderatorPermission) userRoles.push(Roles.communityModerator);
    if (adminPermission) userRoles.push(Roles.communityAdmin);
    return { user, userRoles };
  });

export const emailSignIn = async (email) =>
  fetch(new URL(`${process.env.WALLET_API_ENDPOINT}account/get-verification-code`), {
    method: 'POST',
    body: JSON.stringify({
      email,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const verifyEmail = async (email, code) => {
  const response = await fetch(new URL(`${process.env.WALLET_API_ENDPOINT}account/login`), {
    method: 'POST',
    body: JSON.stringify({
      email,
      code,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { ok: response.ok, response: await response.json() };
};
