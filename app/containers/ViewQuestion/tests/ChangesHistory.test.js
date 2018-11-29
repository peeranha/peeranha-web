import ChangesHistory from '../ChangesHistory';

jest.mock('utils/datetime');

describe('ChangesHistory', () => {
  it('test', () => {
    const props = {
      postTime: 1542624898950,
    };
    expect(ChangesHistory(props)).toMatchSnapshot();
  });
});
