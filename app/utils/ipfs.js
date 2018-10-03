import IpfsApi from 'ipfs-api';

export function getIpfsApi() {
  return IpfsApi('localhost', '5001');
}

export async function saveText(text) {
  const buf = Buffer.from(text, 'utf8');
  const saveResult = await getIpfsApi().add(buf);
  return saveResult[0].hash;
}

export async function getText(hash) {
  const getResult = await getIpfsApi().get(hash);
  return getResult[0].content.toString('utf8');
}

export async function getImage(hash) {
  const getResult = await getIpfsApi().get(hash);
  return URL.createObjectURL(new Blob([getResult[0].content]));
}
