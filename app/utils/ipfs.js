import IpfsApi from 'ipfs-api';

const ipfsApi = IpfsApi('localhost', '5001');

export async function saveText(text) {
  const buf = Buffer.from(text, 'utf8');
  const saveResult = await ipfsApi.add(buf);
  return saveResult[0].hash;
}

export async function getText(hash) {
  const getResult = await ipfsApi.get(hash);
  return getResult[0].content.toString('utf8');
}
