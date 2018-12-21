import FloatingLabelInput from '../FloatingLabelInput';

const props = {
  input: {},
  meta: {
    touched: false,
    error: false,
    warning: false,
  },
  change: () => {},
  multiline: false,
};

describe('FloatingLabelInput', () => {
  it('test1', () => {
    expect(FloatingLabelInput(props)).toMatchSnapshot();
  });

  it('test2, touched, error - true', () => {
    props.meta.touched = true;
    props.meta.error = true;

    expect(FloatingLabelInput(props)).toMatchSnapshot();
  });
});
