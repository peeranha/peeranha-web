import Button from '../Button';

describe('Button', () => {
  const props = {
    buttonParams: {},
    show: false,
  };

  it('@show is falsy', () => {
    props.show = false;
    expect(Button(props)).toMatchSnapshot();
  });

  it('@show is true', () => {
    props.show = true;
    expect(Button(props)).toMatchSnapshot();
  });
});
