import { CommunityField } from '../CommunityField';

const props = {
  input: {},
  meta: {},
  label: 'label',
  tip: 'tip',
  disabled: false,
};

describe('CommunityField', () => {
  it('test', () => {
    expect(CommunityField(props)).toMatchSnapshot();
  });
});
