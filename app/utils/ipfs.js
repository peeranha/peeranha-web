import IpfsApi from 'ipfs-api';

const ipfsApi = IpfsApi('localhost', '5001');

export async function saveText(text) {
  const buf = Buffer.from(bufStr, 'utf8');
  return await ipfsApi.add(buf);
}

export function getText(hash) {
  return ipfsApi.get(hash);
}
