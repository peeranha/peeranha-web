import { Button, BlockButton } from '../Button';

describe('Button', () => {
  const props = {
    params: {},
    children: null,
    show: true,
  };

  it('snapshot tests', () => {
    expect(Button(props)).toMatchSnapshot();
  });
});

describe('BlockButton', () => {
  const props = {
    params: {},
    children: null,
  };

  it('snapshot tests', () => {
    expect(BlockButton(props)).toMatchSnapshot();
  });
});
