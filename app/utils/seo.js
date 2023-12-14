import { slugify } from 'transliteration';
const updateSeoUrl = (title) =>
  encodeURIComponent(
    slugify(title || '')
      .trim()
      .replace(/[.,'#!$%^&*;:{}=\-_`~() ?]/g, '-')
      .toLowerCase(),
  )
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');

export const updateTitle = (title) => {
  if (title === ':title') {
    return ':title';
  }

  return updateSeoUrl(title);
};
