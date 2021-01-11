import _get from 'lodash/get';
import { CURRENCIES } from 'wallet-config';

import messages from './messages';

// TODO: test
const imageValidation = img =>
  img && img.length > 2000000 ? messages.fileSize : undefined;

const byteLength = val => encodeURI(val).split(/%..|./).length - 1;

const maxByteLength = val =>
  byteLength(val) > 256 ? messages.wrongByteLength : undefined;

// TODO: test
const stringLength = (min, max) => value => {
  let val = value;

  let msg = messages.wrongLength.id;

  if (value && value.toJS) {
    val = value.toJS();
  } else if (value && value.trim) {
    val = value.trim().replace(/  +/g, ' ');
  } else if (value && value.map) {
    msg = messages.wrongLengthOfList.id;
  }

  return val && (val.length > max || val.length < min)
    ? { id: msg, min, max }
    : undefined;
};

const numberRange = (min, max) => value => {
  const val = value;
  const msg = messages.wrongNumberRange.id;

  return val && (val > max || val < min) ? { id: msg, min, max } : undefined;
};

// TODO: test
const numberValue = (min, max) => value => {
  console.log(min, max, value);
  let val = value;

  let msg = messages.wrongLength.id;

  // if (value && value.toJS) {
  //   val = value.toJS();
  // } else if (value && value.trim) {
  //   val = value.trim().replace(/  +/g, ' ');
  // } else if (value && value.map) {
  //   msg = messages.wrongLengthOfList.id;
  // }

  return val && (val > max || val < min)
    ? { id: msg, min, max }
    : undefined;
};

// TODO: test
const stringLengthMax = max => value => {
  const val =
    typeof value === 'string' ? value.trim().replace(/  +/g, ' ') : '';

  return val && val.length > max
    ? { id: messages.wrongLengthMax.id, max }
    : undefined;
};

/* eslint no-useless-escape: 0 */
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email && !re.test(email) ? messages.wrongEmail : undefined;
};

const validateURL = url => {
  const re = /^(?:(?:https?):\/\/)(?:www\.|(?!www))([\da-z\-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const isUrl = re.test(url);
  const hasDotSlashSeries = /(\.\.)|(\.\/)|(\/\/.*\/.*\.)|(\s)/g.test(url);
  const hasDoubleSlash = url && url.match(/\/\//g)?.length > 1;
  return url && (!isUrl || hasDotSlashSeries || hasDoubleSlash)
    ? messages.wrongURL
    : undefined;
};

const required = value => {
  let val = value;

  if (Number(value) >= 0) {
    val = Number(value);
  } else if (typeof value === 'string') {
    val = val.trim();
  }

  return !val ? messages.requiredField : undefined;
};

const requiredForObjectField = value => {
  const val = value && value.toJS ? value.toJS() : value;
  return !val || (val && !val.value) ? messages.requiredField : undefined;
};

const valueHasNotBeInList = () => (...args) => {
  const value = args[0];
  const list = args[2].valueHasNotBeInListValidate;
  return list && list.includes(value.toLowerCase())
    ? messages.itemAlreadyExists
    : undefined;
};

const valueHasNotBeInListMoreThanOneTime = (...args) => {
  const value = args[0];
  const list = args[2].valueHasNotBeInListValidate;

  return list &&
    list.filter(x => x && x.trim().toLowerCase() === value.trim().toLowerCase())
      .length > 1
    ? messages.itemAlreadyExists
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
  return value > comparedValue ? messages.valueIsMore : undefined;
};

const bountyCannotBeLessThenPrev = (...args) => {
  if (!_get(args, [2, 'question', 'bounty'])) {
    return undefined;
  }
  const value = Number(args[0]);
  const comparedValue = Number(_get(args, [2, 'question', 'bounty']));
  return value < comparedValue ? messages.hasToBeMoreThanPrev : undefined;
};

const hoursCannotBeLessThenPrev = (...args) => {
  if (!_get(args, [2, 'question', 'bountyHours'])) {
    return undefined;
  }
  const value = Number(args[0]);
  const comparedValue = Number(_get(args, [2, 'question', 'bountyHours']));
  return value < comparedValue ? messages.hasToBeMoreThanPrev : undefined;
};

const comparePasswords = (...args) => {
  const value = args[0];
  const list = args[2].passwordList;

  return list.filter(x => x !== value)[0]
    ? messages.passwordsNotMatch
    : undefined;
};

const validateTelosName = str => {
  if (str) {
    if (str.includes('  ')) {
      return messages.withoutDoubleSpace;
    }
    if (str.replace(/[^.]*[.]?[^.]*/, '').length) {
      return messages.onlyOneDotValue;
    }
    if (!/^[a-z1-5\.]+$/.test(str)) {
      return {
        ...messages.onlyLowerCaseLettersAndNumbersFromTo,
        min: 1,
        max: 5,
      };
    }
    return stringLength(2, 12)(str);
  }

  return undefined;
};

const withoutDoubleSpace = str =>
  str && str.includes('  ') ? messages.withoutDoubleSpace : undefined;

const telosCorrectSymbols = str => {
  if (!/^[a-z1-5]+$/.test(str)) {
    return {
      ...messages.onlyLowerCaseLettersAndNumbersFromTo,
      min: 1,
      max: 5,
    };
  }
  return undefined;
};

const telosNameLength = str =>
  !str || str.length !== 12
    ? { ...messages.wrongExactLength, min: 12 }
    : undefined;

const atLeastOneLetter = str =>
  !str || !/.*[a-z].*/i.test(str) ? messages.atLeastOneLetter : undefined;

const isTelosNameAvailable = async (eosService, telosName) => {
  const account = await eosService.getAccount(telosName);
  return !account;
};

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
  requiredForObjectField,
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
  validateTelosName,
  withoutDoubleSpace,
  maxByteLength,
  telosCorrectSymbols,
  telosNameLength,
  isTelosNameAvailable,
  atLeastOneLetter,
  numberValue,
};
