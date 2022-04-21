export function saveDataToSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getDataFromSessionStorage(key) {
  return JSON.parse(sessionStorage.getItem(key));
}

export function saveChangedItemIdToSessionStorage(storageKey, itemId) {
  const changedItems = getDataFromSessionStorage(storageKey);

  if (changedItems) {
    changedItems.push(itemId);

    saveDataToSessionStorage(storageKey, changedItems);
  } else {
    saveDataToSessionStorage(storageKey, [itemId]);
  }
}

export function isItemChanged(storageKey, itemId) {
  const changedItems = getDataFromSessionStorage(storageKey);

  if (changedItems) {
    return Boolean(changedItems.find(changedItem => changedItem === itemId));
  }
  return false;
}
