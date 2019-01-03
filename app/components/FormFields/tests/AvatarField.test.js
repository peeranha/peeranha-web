import { shallow } from 'enzyme';
import AvatarField, {
  displayImageFunc,
  displayAvatarFunc,
} from '../AvatarField';

describe('AvatarField test', () => {
  it('simulate click', () => {
    const getCroppedAvatar = jest.fn();
    const cmp = AvatarField({
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
});
