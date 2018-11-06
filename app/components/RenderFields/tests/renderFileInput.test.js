import { shallow } from 'enzyme';
import renderFileInput, {
  displayImageFunc,
  displayAvatarFunc,
  WarningMessage,
} from '../renderFileInput';

describe('renderFileInput test', () => {
  it('simulate click', () => {
    const getCroppedAvatar = jest.fn();
    const cmp = renderFileInput({
      input: {},
      label: 'string',
      sendProps: {
        profile: {},
        cachedProfileImg: 'img',
        getCroppedAvatar,
      },
      meta: {},
    });

    expect(cmp).toMatchSnapshot();
    shallow(cmp)
      .find('#getcroppedavatar')
      .simulate('click');

    expect(getCroppedAvatar).toHaveBeenCalledTimes(1);
  });

  it('displayImageFunc', () => {
    expect(displayImageFunc(true, false, false)).toBe(false);
    expect(displayImageFunc(true, true, false)).toBe(true);
    expect(displayImageFunc(false, true, true)).toBe(false);
  });

  it('displayAvatarFunc', () => {
    expect(displayAvatarFunc(true, false)).toBe(false);
    expect(displayAvatarFunc(false, true)).toBe(true);
    expect(displayAvatarFunc(true, true)).toBe(false);
  });

  it('WarningMessage', () => {
    expect(WarningMessage(false, {}, true, true)).toMatchSnapshot();
    expect(WarningMessage(true, {}, true, true)).toMatchSnapshot();
    expect(WarningMessage(true, {}, true, false)).toMatchSnapshot();
    expect(WarningMessage(true, {}, false, true)).toMatchSnapshot();
  });
});
