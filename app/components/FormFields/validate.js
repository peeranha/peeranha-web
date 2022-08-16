import _get from 'lodash/get';
import { CURRENCIES } from 'wallet-config';

// TODO: test
const imageValidation = img =>
  img && img.length > 2000000 ? 'formFields.fileSize' : undefined;

const byteLength = val => encodeURI(val).split(/%..|./).length - 1;

const maxByteLength = val =>
  byteLength(val) > 256 ? 'formFields.wrongByteLength' : undefined;

// TODO: test
const stringLength = (min, max) => value => {
  let val = value;

  let msg = 'formFields.wrongLength';

  if (value && value.toJS) {
    val = value.toJS();
  } else if (value && value.trim) {
    val = value.trim().replace(/  +/g, ' ');
  } else if (value && value.map) {
    msg = 'formFields.wrongLengthOfList';
  }

  return val && (val.length > max || val.length < min)
    ? { id: msg, min, max }
    : undefined;
};

const numberRange = (min, max) => value =>
  value && (value > max || value < min)
    ? { id: 'formFields.wrongNumberRange', min, max }
    : undefined;

// TODO: test
const valueHasToBePositiveInteger = value => {
  const re = /^[0-9]+$/;

  return (value && !re.test(value)) || value === undefined
    ? 'formFields.valueIsNotPositiveInteger'
    : undefined;
};

// TODO: test
const stringLengthMax = max => value => {
  const val =
    typeof value === 'string' ? value.trim().replace(/  +/g, ' ') : '';

  return val && val.length > max
    ? { id: 'formFields.wrongLengthMax', max }
    : undefined;
};

/* eslint no-useless-escape: 0 */
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !re.test(email) ? 'formFields.wrongEmail' : undefined;
};

const validateURL = url => {
  const re = /^(?:(?:https?):\/\/)(?:www\.|(?!www))([\da-z\-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const isUrl = re.test(url);
  const hasDotSlashSeries = /(\.\.)|(\.\/)|(\/\/.*\/.*\.)|(\s)/g.test(url);
  const hasDoubleSlash = url && url.match(/\/\//g)?.length > 1;
  return url && (!isUrl || hasDotSlashSeries || hasDoubleSlash)
    ? 'formFields.wrongURL'
    : undefined;
};

const required = value => {
  let val = value;

  if (Number(value) >= 0) {
    val = Number(value);
  } else if (typeof value === 'string') {
    val = val.trim();
  }

  return !val ? 'formFields.requiredField' : undefined;
};

const requiredPostTypeSelection = value =>
  Number(value) >= 0 ? undefined : 'formFields.postTypeSelectionError';

const requiredAndNotZero = value => {
  let message;
  let val = value;

  if (value && Number(value) >= 0) {
    val = Number(value);
  } else if (typeof value === 'string') {
    val = val.trim();
  }

  if (val === 0) {
    message = 'formFields.requiredAndNotZeroField';
  } else if (!val) {
    message = 'formFields.requiredField';
  }

  return message;
};

const requiredForNumericalField = value =>
  value === '' || Number.isFinite(value) || Number(value) < 0
    ? 'formFields.requiredField'
    : undefined;

const requiredNonZeroInteger = value =>
  (value && value.trim() === '') || !Number.isInteger(Number(value))
    ? 'formFields.requiredNonZeroInteger'
    : undefined;

const requiredForObjectField = value => {
  const val = value && value.toJS ? value.toJS() : value;
  return !val || (val && !val.value) ? 'formFields.requiredField' : undefined;
};

const valueHasNotBeInList = (...args) => {
  const value = args[0];
  const list = args[2].valueHasNotBeInListValidate;

  return list && list.includes(value.toLowerCase())
    ? 'formFields.itemAlreadyExists'
    : undefined;
};

const valueHasNotBeInListMoreThanOneTime = (...args) => {
  const value = args[0];
  const list = args[2].valueHasNotBeInListValidate;

  return list &&
    list.filter(x => x && x.trim().toLowerCase() === value.trim().toLowerCase())
      .length > 1
    ? 'formFields.itemAlreadyExists'
    : undefined;
};

const valueHasToBeLessThan = (...args) => {
  if (
    _get(args, [2, 'currencyValue', 'name'], CURRENCIES.PEER.name) !==
    CURRENCIES.PEER.name
  ) {
    return undefined;
  }
  const value = Number(args[0]);
  const comparedValue = Number(args[2].valueHasToBeLessThan);
  return value > comparedValue ? 'formFields.valueIsMore' : undefined;
};

const bountyCannotBeLessThenPrev = (...args) => {
  if (!_get(args, [2, 'question', 'bounty'])) {
    return undefined;
  }
  const value = Number(args[0]);
  const comparedValue = Number(_get(args, [2, 'question', 'bounty']));
  return value < comparedValue ? 'formFields.hasToBeMoreThanPrev' : undefined;
};

const hoursCannotBeLessThenPrev = (...args) => {
  if (!_get(args, [2, 'question', 'bountyHours'])) {
    return undefined;
  }
  const value = Number(args[0]);
  const comparedValue = Number(_get(args, [2, 'question', 'bountyHours']));
  return value < comparedValue ? 'formFields.hasToBeMoreThanPrev' : undefined;
};

const valueHasToBeLessThanMaxPromotingHours = (...args) => {
  const value = Number(args[0]);
  const comparedValue = Number(args[2].maxPromotingHours);

  return value > comparedValue ? 'formFields.valueIsMore' : undefined;
};

const comparePasswords = (...args) => {
  const value = args[0];
  const list = args[2].passwordList;

  return list.filter(x => x !== value)[0]
    ? 'formFields.passwordsNotMatch'
    : undefined;
};

const withoutDoubleSpace = str =>
  str && str.includes('  ') ? 'formFields.withoutDoubleSpace' : undefined;

const atLeastOneLetter = str =>
  !str || !/.*[a-z].*/i.test(str) ? 'formFields.atLeastOneLetter' : undefined;

const strLength1x5 = stringLength(1, 5);
const strLength1x1000 = stringLength(1, 1000);
const strLength2x15 = stringLength(2, 15);
const strLength8x100 = stringLength(8, 100);
const strLength254Max = stringLengthMax(254);
const strLength100Max = stringLengthMax(100);
const strLength3x20 = stringLength(3, 20);
const strLength15x100 = stringLength(15, 100);
const strLength15x250 = stringLength(15, 250);
const strLength20x1000 = stringLength(20, 1000);
const strLength15x30000 = stringLength(15, 30000);
const strLength25x30000 = stringLength(25, 30000);
const number1x7 = numberRange(1, 7);
const number1x24 = numberRange(1, 24);
const number1x168 = numberRange(1, 168);

export {
  imageValidation,
  stringLength,
  validateEmail,
  validateURL,
  required,
  requiredAndNotZero,
  requiredForObjectField,
  requiredForNumericalField,
  requiredPostTypeSelection,
  requiredNonZeroInteger,
  strLength1x5,
  strLength1x1000,
  strLength2x15,
  strLength8x100,
  strLength254Max,
  strLength100Max,
  strLength3x20,
  strLength15x100,
  strLength15x250,
  strLength20x1000,
  strLength15x30000,
  strLength25x30000,
  number1x7,
  number1x24,
  number1x168,
  valueHasNotBeInList,
  valueHasToBeLessThan,
  bountyCannotBeLessThenPrev,
  hoursCannotBeLessThenPrev,
  comparePasswords,
  valueHasNotBeInListMoreThanOneTime,
  withoutDoubleSpace,
  maxByteLength,
  atLeastOneLetter,
  valueHasToBePositiveInteger,
  valueHasToBeLessThanMaxPromotingHours,
};
