import EditButton from '../EditButton';

describe('EditButton', () => {
  const props = {
    editContent: jest.fn(),
    isItWrittenByMe: false,
    translations: {},
  };

  it('test, @isItWrittenByMe === false', () => {
    expect(EditButton(props)).toMatchSnapshot();
  });

  it('test, @isItWrittenByMe === true', () => {
    props.isItWrittenByMe = true;
    expect(EditButton(props)).toMatchSnapshot();
  });
});
