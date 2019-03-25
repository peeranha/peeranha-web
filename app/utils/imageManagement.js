/* istanbul ignore next */
export async function getBlob(canvas) {
  const res = await fetch(canvas);
  const blob = await res.blob();

  return blob;
}

/* eslint no-empty: 0 */
export function uploadImage(event, callback) /* istanbul ignore next */ {
  try {
    const file = event.target.files[0];
    const reader = new window.FileReader();

    reader.onloadend = () => {
      callback(reader.result);
    };

    reader.readAsArrayBuffer(file);
  } catch (err) {}
}

export async function getCroppedAvatar(
  obj,
  callback,
) /* istanbul ignore next */ {
  if (obj) {
    const canvas = obj.getImage().toDataURL('image/jpeg', 0.5);
    const blob = await getBlob(canvas);

    callback({
      blob,
      cachedProfileImg: window.URL.createObjectURL(blob),
    });
  }
}
