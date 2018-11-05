import messages from './messages';

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages[`wrongLength${max}`] && messages[`wrongLength${max}`].id
    : undefined;

export const strLength20 = stringLength(3, 20);
export const strLength1000 = stringLength(3, 1000);
export const required = value =>
  !value ? messages.requiredField.id : undefined;
