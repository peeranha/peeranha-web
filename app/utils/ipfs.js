/* eslint no-throw-literal: 0, camelcase: 0, eqeqeq: 0, no-shadow: 0, no-param-reassign: 0 */
import bs58 from 'bs58';
import { create } from 'ipfs-http-client';

import {
  callService,
  SAVE_FILE_SERVICE,
} from 'utils/web_integration/src/util/aws-connector';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { ApplicationError } from './errors';

export function ipfsApi() {
  return create(process.env.IPFS_API_URL);
}

function ipfsApiTheGraph() {
  return create(process.env.IPFS_API_URL_THE_GRAPH);
}

function web3StorageApi() {
  const token = process.env.WEB3_STORAGE_API_TOKEN;

  if (!token) {
    throw new Error(
      'WEB3_STORAGE_API_TOKEN environment variable is not defined',
    );
  }

  return new Web3Storage({ token });
}

async function saveDataWeb3Storage(data) {
  return web3StorageApi().put([new File([data], 'data')]);
}

async function saveDataToAllStorages(content, buf, encoding) {
  const dataIpfsS3 = {
    content,
    encoding,
  };

  const [resultIpfsS3] = await Promise.all([
    saveDataIpfsS3(dataIpfsS3),
    saveDataTheGraph(buf),
    saveDataWeb3Storage(buf),
  ]);
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

      Object.keys(parsedText).forEach(x => {
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

  return saveDataToAllStorages(buf, buf, 'utf8');
}

async function saveDataTheGraph(buf) {
  return ipfsApiTheGraph().add(buf);
}

async function saveDataIpfsS3(file) {
  return callService(SAVE_FILE_SERVICE, { file });
}

export async function saveFile(file) {
  const buf = Buffer.from(file);

  return saveDataToAllStorages(file, buf, 'base64');
}

export async function getText(hash) {
  const response = await fetch(getFileUrl(hash)).then(x => x.text());
  return response;
}

export function getFileUrl(hash) {
  if (window.renderedByPuppeteer) {
    return null;
  }
  const IPFS_DOMAIN = process.env.IPFS_CDN_URL;
  return hash?.includes(IPFS_DOMAIN) ? hash : `${IPFS_DOMAIN}${hash}`;
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

export const getBytes32FromIpfsHash = ipfsListing =>
  `0x${bs58
    .decode(ipfsListing)
    .slice(2)
    .toString('hex')}`;

export const getIpfsHashFromBytes32 = bytes32Hex => {
  const hashHex = `1220${bytes32Hex.slice(2)}`;
  const hashBytes = Buffer.from(hashHex, 'hex');
  return bs58.encode(hashBytes);
};

export function parseTableRows(v) {
  if (typeof v === 'object' && v !== null && !(v instanceof Date)) {
    if (v instanceof Array) {
      v.forEach(v => parseTableRows(v));
    } else {
      Object.keys(v).forEach(key => {
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
      v.forEach(v => createPushActionBody(v));
    } else {
      Object.keys(v).forEach(key => {
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
