import Community from '../index';

describe('Community', () => {
  const props = {
    communities: [
      {
        id: 1,
        name: 'name',
      },
    ],
    communityId: 1,
  };

  it('test', () => {
    expect(Community(props)).toMatchSnapshot();
  });
});
