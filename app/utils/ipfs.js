/* eslint no-throw-literal: 0, camelcase: 0, eqeqeq: 0, no-shadow: 0, no-param-reassign: 0 */
import bs58 from 'bs58';
import { create } from 'ipfs-http-client';

import { ApplicationError } from './errors';

export function getIpfsApi() {
  return create(process.env.IPFS_API_URL);
}

function getIpfsApiTheGraph() {
  return create(process.env.IPFS_API_URLTHE_GRAPH);
}

async function saveTextTheGraph(buf) {
  const saveResult = await getIpfsApiTheGraph().add(buf);
  // return saveResult.cid.toString();
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
  const saveResult = await getIpfsApi().add(buf);

  await saveTextTheGraph(buf);
  return saveResult.cid.toString();
}

async function saveFileTheGraph(buf) {
  const saveResult = await getIpfsApiTheGraph().add(buf);
  // return saveResult.cid.toString();
}

export async function saveFile(file) {
  const buf = Buffer.from(file);
  const saveResult = await getIpfsApi().add(buf);

  await saveFileTheGraph(buf);

  return saveResult[0].hash;
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
  return hash.includes(IPFS_DOMAIN) ? hash : `${IPFS_DOMAIN}${hash}`;
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
