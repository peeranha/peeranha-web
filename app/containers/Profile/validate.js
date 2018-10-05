export const imageValidation = value => {
  const maxSize = 10000000;
  return value && value[0] && value[0].size > maxSize
    ? `Max size is ${maxSize / 1000000}Mb`
    : undefined;
};

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? `${min} - min, ${max} - max`
    : undefined;

export const strLength20 = stringLength(3, 20);
export const strLength96 = stringLength(3, 96);
