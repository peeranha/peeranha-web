import DefaultInput from '../DefaultInput';
import messages from '../messages';

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
    props.meta.error = messages.title;

    expect(DefaultInput(props)).toMatchSnapshot();
  });
});
