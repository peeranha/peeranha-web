import Button from '../Button';

describe('Button', () => {
  const props = {
    buttonParams: {},
    isItWrittenByMe: false,
  };

  it('@isItWrittenByMe is falsy', () => {
    props.isItWrittenByMe = false;
    expect(Button(props)).toMatchSnapshot();
  });

  it('@isItWrittenByMe is true', () => {
    props.isItWrittenByMe = true;
    expect(Button(props)).toMatchSnapshot();
  });
});
