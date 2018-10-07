import messages from './messages';

export const imageValidation = value => {
  const maxSize = 10000000;
  return value && value[0] && value[0].size > maxSize
    ? messages.fileSize.id
    : undefined;
};

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages.stringLength.id
    : undefined;

export const strLength20 = stringLength(3, 20);
export const strLength96 = stringLength(3, 96);
