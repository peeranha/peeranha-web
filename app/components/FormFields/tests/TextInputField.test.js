import { TextInputField } from '../TextInputField';

const props = {
  input: {},
  label: 'label',
  readOnly: false,
  disabled: false,
  meta: {},
  placeholder: 'placeholder',
  isSearchable: false,
  tip: 'tip',
};

describe('TextInputField test', () => {
  it('test', () => {
    expect(TextInputField(props)).toMatchSnapshot();
  });
});
