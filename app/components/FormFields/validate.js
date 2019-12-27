import messages from './messages';

// TODO: test
const imageValidation = img =>
  img && img.length > 2000000 ? messages.fileSize : undefined;

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

const required = value => {
  const val = typeof value === 'string' ? value.trim() : value;
  return !val ? messages.requiredField : undefined;
};

const requiredForObjectField = value => {
  const val = value && value.toJS ? value.toJS() : value;
  return !val || (val && !val.value) ? messages.requiredField : undefined;
};

const valueHasNotBeInList = (...args) => {
  const value = args[0];
  const list = args[2].valueHasNotBeInListValidate;

  return list &&
    list.find(
      x => x && x.trim().toLowerCase() === value && value.trim().toLowerCase(),
    )
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
  const value = Number(args[0]);
  const comparedValue = Number(args[2].valueHasToBeLessThan);

  return value > comparedValue ? messages.valueIsMore : undefined;
};

const comparePasswords = (...args) => {
  const value = args[0];
  const list = args[2].passwordList;

  return list.filter(x => x !== value)[0]
    ? messages.passwordsNotMatch
    : undefined;
};

const strLength1x5 = stringLength(1, 5);
const strLength2x15 = stringLength(2, 15);
const strLength8x100 = stringLength(8, 100);
const strLength12Max = stringLengthMax(12);
const strLength254Max = stringLengthMax(254);
const strLength3x20 = stringLength(3, 20);
const strLength15x100 = stringLength(15, 100);
const strLength20x1000 = stringLength(20, 1000);
const strLength25x30000 = stringLength(25, 30000);

export {
  imageValidation,
  stringLength,
  validateEmail,
  required,
  requiredForObjectField,
  strLength1x5,
  strLength2x15,
  strLength8x100,
  strLength12Max,
  strLength254Max,
  strLength3x20,
  strLength15x100,
  strLength20x1000,
  strLength25x30000,
  valueHasNotBeInList,
  valueHasToBeLessThan,
  comparePasswords,
  valueHasNotBeInListMoreThanOneTime,
};
