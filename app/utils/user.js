export const getUserName = (name, hash) => {
  if (name) {
    return name;
  }
  if (hash) {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  }
  return 'default name';
};
