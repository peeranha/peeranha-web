/* eslint no-throw-literal: 0, camelcase: 0, eqeqeq: 0, no-shadow: 0, no-param-reassign: 0 */
import bs58 from 'bs58';
import { create } from 'ipfs-http-client';

import { callService, SAVE_FILE_SERVICE } from 'utils/web_integration/src/util/aws-connector';
import { ApplicationError } from './errors';

export function ipfsApi() {
  return create(process.env.IPFS_API_URL);
}

async function saveDataToAllStorages(content, buf, encoding) {
  const dataIpfsS3 = {
    content,
    encoding,
  };

  const resultIpfsS3 = await saveDataIpfsS3(dataIpfsS3);
  return resultIpfsS3.body.cid;
}

// TODO: test
export async function saveText(text) {
  let parsedText;

  if (typeof text === 'string') {
    parsedText = text;
  } else {
    try {
      parsedText = JSON.parse(text);

      Object.keys(parsedText).forEach((x) => {
        if (typeof parsedText[x] === 'string') {
          parsedText[x] = parsedText[x].trim();
        }
      });

      parsedText = JSON.stringify(parsedText);
    } catch (err) {
      parsedText = text;
    }
  }

  const buf = Buffer.from(parsedText, 'utf8');

  return saveDataToAllStorages(buf, 'utf8');
}

export async function saveDataIpfsS3(file, signal) {
  return callService(SAVE_FILE_SERVICE, { file }, false, signal);
}

export async function saveFile(file) {
  return saveDataToAllStorages(file, 'base64');
}

export async function getText(hash) {
  const response = await fetch(getFileUrl(hash)).then((x) => x.text());
  return response;
}

export function getFileUrl(hash) {
  if (window.renderedByPuppeteer) {
    return null;
  }
  const IPFS_DOMAIN = process.env.IPFS_CDN_URL;
  return hash?.includes(IPFS_DOMAIN) ? hash : `${IPFS_DOMAIN}${hash}`;
}

export function getNFTUrl(hash) {
  if (window.renderedByPuppeteer) {
    return null;
  }
  const NFT_DOMAIN = process.env.IPFS_NFT_URL;
  return hash?.includes(NFT_DOMAIN) ? hash : `${NFT_DOMAIN}${hash}`;
}

// TODO: test
export function HashToString(byteArray) {
  if (byteArray.length < 2) {
    throw new ApplicationError('Provided byte array is not IpfsHash');
  }
  const res = [byteArray[0], byteArray.length - 1];
  res.push(...byteArray.slice(1));
  return bs58.encode(Buffer.from(res));
}

export function StringToHash(stringHash) {
  const buf_array = bs58.decode(stringHash);
  if (buf_array.length < 2 || buf_array[1] != buf_array.length - 2) {
    throw new ApplicationError('Provided string is not IpfsHash');
  }
  const res = [buf_array[0]];
  res.push(...buf_array.slice(2));
  return res;
}

export const getBytes32FromIpfsHash = (ipfsListing) =>
  `0x${bs58.decode(ipfsListing).slice(2).toString('hex')}`;

export const getVector8FromIpfsHash = (ipfsListing) =>
  `${bs58.decode(ipfsListing).slice(2).toString('hex')}`;

export const getIpfsHashFromBytes32 = (bytes32Hex) => {
  const hashHex = `1220${bytes32Hex.slice(2)}`;
  const hashBytes = Buffer.from(hashHex, 'hex');
  return bs58.encode(hashBytes);
};

export function parseTableRows(v) {
  if (typeof v === 'object' && v !== null && !(v instanceof Date)) {
    if (v instanceof Array) {
      v.forEach((v) => parseTableRows(v));
    } else {
      Object.keys(v).forEach((key) => {
        if (key.startsWith('ipfs_')) {
          v[key] = HashToString(v[key]);
        } else {
          parseTableRows(v[key]);
        }
      });
    }
  }
}

export function createPushActionBody(v) {
  if (typeof v === 'object' && v !== null && !(v instanceof Date)) {
    if (v instanceof Array) {
      v.forEach((v) => createPushActionBody(v));
    } else {
      Object.keys(v).forEach((key) => {
        if (key.startsWith('ipfs_')) {
          if (v[key] && typeof v[key] === 'string') {
            v[key] = StringToHash(v[key]);
          } else {
            console.error('Ipfs value isnt string', v[key]);
          }
        } else {
          createPushActionBody(v[key]);
        }
      });
    }
  }
}
