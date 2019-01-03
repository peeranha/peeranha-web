import SelectField from '../SelectField';

const props = {
  input: {
    value: '',
    onBlur: jest.fn(),
  },
  label: 'label',
  options: [],
  isMulti: false,
  isClearable: false,
  isSearchable: false,
  disabled: false,
  meta: {},
};

describe('SelectField', () => {
  it('test', () => {
    expect(SelectField(props)).toMatchSnapshot();
  });
});
