import messages from './messages';

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages.displayNameLength.id
    : undefined;

export const strLength = stringLength(3, 20);
export const required = value =>
  !value ? messages.requiredField.id : undefined;
