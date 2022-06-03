export const getUserName = (name, hash) => {
  if (name) {
    return name;
  }

  return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
};
