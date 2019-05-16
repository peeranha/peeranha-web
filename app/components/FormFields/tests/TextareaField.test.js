import { TextareaField } from '../TextareaField';

const props = {
  input: {},
  label: 'label',
  disabled: false,
  meta: {},
  placeholder: 'placeholder',
  tip: 'tip',
};

describe('TextareaField test', () => {
  it('snapshot test', () => {
    expect(TextareaField(props)).toMatchSnapshot();
  });
});
