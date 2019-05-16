import Feed from '../index';

describe('Feed', () => {
  it('test', () => {
    expect(Feed()).toMatchSnapshot();
  });
});
