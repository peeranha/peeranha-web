import messages from 'containers/Profile/messages';
import { imageValidation, stringLength } from '../validate';
import { FILE_MAX_SIZE } from '../constants';

describe('imageValidation', () => {
  it('file is null', () => {
    const file = null;
    expect(imageValidation(file)).toBe(undefined);
  });

  it('file is not null, size is more', () => {
    const file = [{ size: 2 * FILE_MAX_SIZE }];
    expect(imageValidation(file)).toBe(messages.fileSize.id);
  });

  it('file is not null, size is less', () => {
    const file = [{ size: 0.5 * FILE_MAX_SIZE }];
    expect(imageValidation(file)).toBe(undefined);
  });
});

describe('stringLength', () => {
  it('@value.length is more than @max', () => {
    const min = 2;
    const max = 5;
    const value = 'cheburek';
    expect(stringLength(min, max)(value)).toBe(messages.stringLength.id);
  });

  it('@value.length is normal', () => {
    const min = 2;
    const max = 10;
    const value = 'cheburek';
    expect(stringLength(min, max)(value)).toBe(undefined);
  });
});
