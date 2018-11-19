import RecordingDate from '../RecordingDate';

describe('RecordingDate', () => {
  it('test', () => {
    const props = {
      postTime: 1542624898950,
    };
    expect(RecordingDate(props)).toMatchSnapshot();
  });
});
