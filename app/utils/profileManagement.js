import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { getFileUrl, getText, saveFile, saveText } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  ALL_TG_ACCOUNTS_SCOPE,
  CONFIRM_TELEGRAM_ACCOUNT,
  INF_LIMIT,
  NO_AVATAR,
  SAVE_PROFILE_METHOD,
  TG_ACCOUNT_TABLE,
  UNLINK_TELEGRAM_ACCOUNT,
} from './constants';
import { callService, NOTIFICATIONS_INFO_SERVICE } from './web_integration/src/util/aws-connector';

export function getUserAvatar(avatarHash, userId, account) {
  if (avatarHash && avatarHash !== NO_AVATAR) {
    return getFileUrl(avatarHash);
  }

  if (userId && userId === account) {
    return editUserNoAvatar;
  }

  if (userId) {
    return noAvatar;
  }

  return userBodyAvatar;
}

export async function uploadImg(img) {
  const data = img.replace(/^data:image\/\w+;base64,/, '');
  const buf = Buffer.from(data, 'base64');

  const imgHash = await saveFile(buf);
  const imgUrl = await getFileUrl(imgHash);

  return { imgUrl, imgHash };
}

export class Fetcher {
  constructor(
    firstFetchCount,
    fetchCount,
    sortType,
    eosService,
  ) /* istanbul ignore next */ {
    // No abstract classes in JS:(
    if (new.target === Fetcher)
      throw new TypeError(
        'Cannot construct Fetcher instances directly(abstract)',
      );
    if (!this.TABLE) throw new TypeError('Must override TABLE method');

    if (!this.SCOPE) throw new TypeError('Must override SCOPE method');

    if (!this.PRIMARY_KEY)
      throw new TypeError('Must override PRIMARY_KEY method');

    if (this.firstFetchCount < 1 || this.fetchCount < 1)
      throw new TypeError('Fetch counts must be grater than 1');

    this.sortType = sortType;
    this.firstFetchCount = firstFetchCount;
    this.fetchCount = fetchCount;
    this.itemArray = [];
    this.hasMoreToFetch = true;
    this.eosService = eosService;
  }

  async getNextItems() /* istanbul ignore next */ {
    const itemsToReturn = { items: [], more: true };

    if (!this.hasMoreToFetch) {
      if (this.itemArray.length > this.fetchCount) {
        itemsToReturn.items = this.itemArray.splice(0, this.fetchCount);
      } else {
        itemsToReturn.items = this.itemArray;
        this.itemArray = [];
        itemsToReturn.more = false;
      }

      return itemsToReturn;
    }

    const fetchAtLeast = async count => {
      if (!this.hasMoreToFetch) return;

      const { rows, more } = await this.eosService.getTableRows(
        this.TABLE,
        this.SCOPE,
        this.lastKeyFetched,
        count,
        undefined,
        this.sortType.indexPosition,
        this.sortType.keyType,
      );

      if (!more) {
        this.hasMoreToFetch = false;
      }

      if (!rows.length) return;

      this.lastKeyFetched =
        this.sortType.keyFunc(rows[rows.length - 1][this.sortType.keyName]) + 1;

      this.itemArray.push(...rows);

      if (this.itemArray.length < count && more) {
        await fetchAtLeast(count - this.itemArray.length);
      }
    };

    if (!this.lastKeyFetched) {
      this.lastKeyFetched = !this.sortType ? 0 : this.sortType.lowerBound();

      await fetchAtLeast(this.firstFetchCount);

      if (this.itemArray.length >= this.firstFetchCount) {
        itemsToReturn.items = this.itemArray.splice(0, this.firstFetchCount);
      } else {
        itemsToReturn.items = this.itemArray;
        this.itemArray = [];
      }

      if (!itemsToReturn.items.length) {
        itemsToReturn.more = false;
      }
      return itemsToReturn;
    }

    // We have enought in buffer fetch is not required
    if (this.itemArray.length >= this.fetchCount) {
      itemsToReturn.items = this.itemArray.splice(0, this.fetchCount);
      return itemsToReturn;
    }

    // Need additional fetch
    await fetchAtLeast(this.fetchCount);

    if (this.itemArray.length >= this.fetchCount) {
      itemsToReturn.items = this.itemArray.splice(0, this.fetchCount);
    } else {
      itemsToReturn.items = this.itemArray;
      this.itemArray = [];
    }

    if (!itemsToReturn.items.length) {
      itemsToReturn.more = false;
    }

    return itemsToReturn;
  }
}

export class AccountsSortedBy {
  static get rating() {
    return {
      lowerBound: () => 0,
      keyName: 'rating',
      indexPosition: 2,
      keyType: 'i64',
      keyFunc: key => 4294967296 - key,
    };
  }

  static get registration_time() {
    return {
      lowerBound: () => 0,
      keyName: 'registration_time',
      indexPosition: 3,
      keyType: 'i64',
      keyFunc: key => key,
    };
  }
}

/* eslint no-useless-constructor: 0 */
export class UsersFetcher extends Fetcher {
  constructor(firstFetchCount, fetchCount, sortType, eosService) {
    super(firstFetchCount, fetchCount, sortType, eosService);
  }

  get TABLE() {
    return ACCOUNT_TABLE;
  }

  get SCOPE() {
    return ALL_ACCOUNTS_SCOPE;
  }

  get PRIMARY_KEY() {
    return 'user';
  }
}

/* eslint camelcase: 0 */
export async function getProfileInfo(user, ethereumService, getExtendedProfile) {
  if (!user) return null;

  const profile = await ethereumService.getProfile(user);

  // if (!profile || profile.userAddress !== user) return null;

  // if (!profile.achievements_reached) {
  //   const userAchievements = await getAchievements(
  //     eosService,
  //     USER_ACHIEVEMENTS_TABLE,
  //     user,
  //   );
  //
  //   profile.achievements_reached = userAchievements;
  // }

  if (getExtendedProfile) {
    const ipfsProfile = await getText(profile.ipfsHash);
    profile.profile = JSON.parse(ipfsProfile);
  }

  return profile;
}

export async function saveProfile(eosService, user, avatar, profile) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  await eosService.sendTransaction(user, SAVE_PROFILE_METHOD, {
    user,
    ipfs_profile: ipfsProfile,
    display_name: profile[DISPLAY_NAME_FIELD] || '',
    ipfs_avatar: avatar,
  });
}

export const getNotificationsInfo = async user => {
  const response = await callService(
    NOTIFICATIONS_INFO_SERVICE,
    { user },
    true,
  );
  return response.OK ? response.body : { all: 0, unread: 0 };
};

export async function getUserTelegramData(eosService, userName) {
  const { rows } = await eosService.getTableRows(
    TG_ACCOUNT_TABLE,
    ALL_TG_ACCOUNTS_SCOPE,
    0,
    INF_LIMIT,
  );

  const userTgData = rows.filter(item => item.user === userName);
  const telegram_id = userTgData.length > 0 ? userTgData[0].telegram_id : 0;
  const temporaryAccount = rows.filter(
    item => item.telegram_id === telegram_id && item.user !== userName,
  );
  const temporaryUser = temporaryAccount.length
    ? temporaryAccount[0].user
    : undefined;
  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    temporaryUser,
  );
  const temporaryAccountDisplayName =
    profile && profile.user === temporaryUser
      ? profile.display_name
      : undefined;
  return userTgData.length > 0
    ? {
        ...userTgData[0],
        temporaryUser,
        temporaryAccountDisplayName,
      }
    : null;
}

export async function confirmTelegramAccount(eosService, user) {
  await eosService.sendTransaction(user, CONFIRM_TELEGRAM_ACCOUNT, { user });
}

export async function unlinkTelegramAccount(eosService, user) {
  await eosService.sendTransaction(user, UNLINK_TELEGRAM_ACCOUNT, { user });
}

export const getAvailableBalance = profile => {
  const stakedInCurrentPeriod = profile?.stakedInCurrentPeriod ?? 0;
  const stakedInNextPeriod = profile?.stakedInNextPeriod ?? 0;
  const balance = profile?.balance ?? 0;
  return stakedInCurrentPeriod >= stakedInNextPeriod
    ? balance - stakedInCurrentPeriod
    : balance - stakedInNextPeriod;
};
