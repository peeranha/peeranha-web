import messages from './messages';

export const imageValidation = img =>
  !img || (img && img.length > 2000000) ? messages.fileSize : undefined;

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages[`wrongLength${min}x${max}`]
    : undefined;

/* eslint no-useless-escape: 0 */
export const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(email) ? messages.wrongEmail : undefined;
};

export const required = x => (!x ? messages.requiredField : undefined);

export const requiredForObjectField = x =>
  !x || (x && !x.value) ? messages.requiredField : undefined;

export const strLength1x5 = stringLength(1, 5);
export const strLength2x15 = stringLength(2, 15);
export const strLength3x20 = stringLength(3, 20);
export const strLength15x100 = stringLength(15, 100);
export const strLength20x1000 = stringLength(20, 1000);
export const strLength25x30000 = stringLength(25, 30000);
