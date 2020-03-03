import userBodyAvatar from 'images/user2.svg?inline';
import noAvatar from 'images/noAvatar.png';
import editUserNoAvatar from 'images/editUserNoAvatar.png';

import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { saveText, getText, saveFile, getFileUrl } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  SAVE_PROFILE_METHOD,
  NO_AVATAR,
} from './constants';

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
export async function getProfileInfo(user, eosService, getExtendedProfile) {
  if (!user) return null;

  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  if (!profile || profile.user !== user) return null;

  if (getExtendedProfile) {
    const ipfsProfile = await getText(profile.ipfs_profile);
    const parsedIpfsProfile = JSON.parse(ipfsProfile);

    profile.profile = parsedIpfsProfile;
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
