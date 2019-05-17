import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { saveText, getText, saveFile, getFileUrl } from './ipfs';

import {
  ACCOUNT_TABLE,
  ALL_ACCOUNTS_SCOPE,
  SAVE_PROFILE_METHOD,
} from './constants';

export async function uploadImg(img) {
  const imgHash = await saveFile(img);
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
        'Cannot construct Fetcer instances directly(abstract)',
      );
    if (!this.TABLE) throw new TypeError('Must override TABLE method');

    if (!this.SCOPE) throw new TypeError('Must override SCOPE method');

    if (!this.PRIMARY_KEY)
      throw new TypeError('Must override PRIMARY_KEY method');

    if (this.firstFetchCount < 1 || this.fetchCount < 1)
      throw new TypeError('Fetch counts must be grather than 1');

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

      const fetch_param = {
        table: this.TABLE,
        scope: this.SCOPE,
        limit: count + 2,
        lower_bound: this.lastKeyFetched,
      };

      fetch_param.index_position = this.sortType.indexPosition;
      fetch_param.key_type = this.sortType.keyType;

      let fetchRes = await this.eosService.getTableRows(
        this.TABLE,
        this.SCOPE,
        fetch_param.lower_bound,
        fetch_param.limit,
        undefined,
        fetch_param.index_position,
        fetch_param.key_type,
      );

      fetchRes = { rows: fetchRes };

      if (!fetchRes.more) {
        this.hasMoreToFetch = false;
      }

      if (!fetchRes.rows.length) return;

      this.lastKeyFetched = this.sortType.keyFunc(
        fetchRes.rows[fetchRes.rows.length - 1][this.sortType.keyName],
      );

      this.itemArray.push(...fetchRes.rows);

      const idSet = new Set();

      fetchRes.rows.forEach(item => {
        idSet.add(item[this.PRIMARY_KEY]);
      });

      delete fetch_param.limit;

      fetch_param.lower_bound = this.lastKeyFetched;
      fetch_param.upper_bound = this.lastKeyFetched + 1;

      fetchRes = await this.eosService.getTableRows(
        this.TABLE,
        this.SCOPE,
        fetch_param.lower_bound,
        fetch_param.limit,
        undefined,
        fetch_param.index_position,
        fetch_param.key_type,
      );

      fetchRes = { rows: fetchRes };

      fetchRes.rows.forEach(item => {
        if (!idSet.has(item[this.PRIMARY_KEY])) this.itemArray.push(item);
      });

      this.lastKeyFetched += 1;
    };

    if (!this.lastKeyFetched) {
      this.lastKeyFetched = !this.sortType ? 0 : this.sortType.lowerBound();

      await fetchAtLeast(this.firstFetchCount);

      if (this.itemArray.length > this.firstFetchCount) {
        itemsToReturn.items = this.itemArray.splice(0, this.firstFetchCount);
      } else {
        itemsToReturn.items = this.itemArray;
        this.itemArray = [];
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

    if (this.itemArray.length > this.fetchCount) {
      itemsToReturn.items = this.itemArray.splice(0, this.fetchCount);
    } else {
      itemsToReturn.items = this.itemArray;
      this.itemArray = [];
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
export async function getProfileInfo(user, eosService) {
  if (!user) return null;

  const profile = await eosService.getTableRow(
    ACCOUNT_TABLE,
    ALL_ACCOUNTS_SCOPE,
    user,
  );

  if (!profile) return null;

  const ipfsProfile = await getText(profile.ipfs_profile);
  const parsedIpfsProfile = JSON.parse(ipfsProfile);

  const ipfs_avatar = parsedIpfsProfile.ipfs_avatar
    ? await getFileUrl(parsedIpfsProfile.ipfs_avatar)
    : '';

  profile.profile = parsedIpfsProfile;
  profile.ipfs_avatar = ipfs_avatar;

  return profile;
}

export async function saveProfile(user, profile, eosService) {
  const ipfsProfile = await saveText(JSON.stringify(profile));

  await eosService.sendTransaction(user, SAVE_PROFILE_METHOD, {
    user,
    ipfs_profile: ipfsProfile,
    display_name: profile[DISPLAY_NAME_FIELD] || '',
  });
}

// TODO: to move url to .env file later
export async function getCitiesList(city) {
  const cities = await fetch(
    `http://api.geonames.org/searchJSON?q=${city}&maxRows=5&username=romrem`,
  );
  const citiesText = await cities.text();
  const citiesParsed = await JSON.parse(citiesText);
  return citiesParsed.geonames;
}
