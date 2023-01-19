const updateSeoUrl = (title) =>
  encodeURIComponent(title?.trim().replace(/ /g, '-').toLowerCase());

export const updateTitle = (title) => {
  if (title === ':title') {
    return ':title';
  }

  return updateSeoUrl(title);
};
