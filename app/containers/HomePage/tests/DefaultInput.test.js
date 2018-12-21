import DefaultInput from '../DefaultInput';

const props = {
  input: {},
  meta: {
    touched: false,
    error: false,
    warning: false,
  },
  disabled: false,
  change: () => {},
  multiline: false,
};

describe('DefaultInput', () => {
  it('test1', () => {
    expect(DefaultInput(props)).toMatchSnapshot();
  });

  it('test2, touched, error - true', () => {
    props.meta.touched = true;
    props.meta.error = true;

    expect(DefaultInput(props)).toMatchSnapshot();
  });
});
