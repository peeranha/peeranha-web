import SelectItem from '../SelectItem';
import messages from '../messages';

const props = {
  input: {},
  meta: {
    touched: false,
    error: false,
    warning: false,
  },
  change: () => {},
  items: ['item1', 'item2'],
};

describe('SelectItem', () => {
  it('test1', () => {
    expect(SelectItem(props)).toMatchSnapshot();
  });

  it('test2, touched, error - true', () => {
    props.meta.touched = true;
    props.meta.error = messages.title;

    expect(SelectItem(props)).toMatchSnapshot();
  });
});
