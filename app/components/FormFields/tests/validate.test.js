import { FILE_MAX_SIZE } from 'containers/EditProfilePage/constants';

import {
  imageValidation,
  stringLength,
  required,
  validateEmail,
  requiredForObjectField,
} from '../validate';

import messages from '../messages';

describe('imageValidation', () => {
  it('file is null', () => {
    const file = null;

    expect(imageValidation(file)).toBe(undefined);
  });

  it('file is not null, size is more', () => {
    const file = [{ size: 2 * FILE_MAX_SIZE }];

    expect(imageValidation(file)).toBe(messages.fileSize);
  });

  it('file is not null, size is less', () => {
    const file = [{ size: 0.5 * FILE_MAX_SIZE }];

    expect(imageValidation(file)).toBe(undefined);
  });
});

describe('validate function', () => {
  const str = 'stringstringstring121';

  it('undefined', () => {
    const str1 = 'string3333string33331';

    expect(stringLength(str1.length - 1, 20)(str1)).toEqual(undefined);
  });

  it('it has to return string if param @min is more than length of string', () => {
    expect(typeof stringLength(25, 30000)(str)).toBe('object');
  });
});

describe('validateEmail', () => {
  it('test, valid email', () => {
    const email = 'email@email.com';

    expect(validateEmail(email)).toBe(undefined);
  });

  it('test, invalid email', () => {
    const email = 'ema22ilema2222il.co222m';

    expect(validateEmail(email)).toEqual(messages.wrongEmail);
  });
});

describe('required function', () => {
  it('x is TRUE; returns undefined', () => {
    expect(required('string')).toEqual(undefined);
  });

  it('x is FALSE; returns validation message', () => {
    expect(required('')).toEqual(messages.requiredField);
  });
});

describe('requiredForObjectField', () => {
  describe('return validation message', () => {
    it('x && !x.value', () => {
      expect(requiredForObjectField({ value: null })).toEqual(
        messages.requiredField,
      );
    });

    it('!x', () => {
      expect(requiredForObjectField(null)).toEqual(messages.requiredField);
    });
  });

  describe('return undefined', () => {
    it('x && x.value', () => {
      expect(requiredForObjectField({ value: 'value' })).toEqual(undefined);
    });
  });
});
