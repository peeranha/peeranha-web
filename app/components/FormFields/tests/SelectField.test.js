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
  it('test1, onBlur', () => {
    props.input.onBlur = () => true;
    expect(SelectField(props)).toMatchSnapshot();
  });

  it('test2, !onBlur', () => {
    props.input.onBlur = null;
    expect(SelectField(props)).toMatchSnapshot();
  });
});
