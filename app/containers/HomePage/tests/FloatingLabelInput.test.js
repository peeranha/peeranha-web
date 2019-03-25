import FloatingLabelInput from '../FloatingLabelInput';
import messages from '../messages';

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
    props.meta.error = messages.title;

    expect(FloatingLabelInput(props)).toMatchSnapshot();
  });
});
