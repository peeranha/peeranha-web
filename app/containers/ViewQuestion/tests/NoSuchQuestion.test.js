import NoSuchQuestion from '../NoSuchQuestion';

describe('NoSuchQuestion', () => {
  it('test', () => {
    const props = {};
    expect(NoSuchQuestion(props)).toMatchSnapshot();
  });
});
