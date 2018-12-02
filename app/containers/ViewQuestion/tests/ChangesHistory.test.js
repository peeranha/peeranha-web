import ChangesHistory from '../ChangesHistory';

jest.mock('utils/datetime');

describe('ChangesHistory', () => {
  const props = {
    postTime: 1542624898950,
    lastEditedDate: 1542624899950,
  };

  it('@lastEditedDate is true', () => {
    props.lastEditedDate = 1542624899950;
    expect(ChangesHistory(props)).toMatchSnapshot();
  });

  it('@lastEditedDate is null', () => {
    props.lastEditedDate = null;
    expect(ChangesHistory(props)).toMatchSnapshot();
  });
});
