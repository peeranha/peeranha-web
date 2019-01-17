import SuggestedCommunitiesView from '../SuggestedCommunitiesView';

describe('SuggestedCommunitiesView', () => {
  const props = {
    communities: [
      {
        id: 1,
        creator: 'user',
        votes: ['user1'],
        name: 'name',
        description: 'description',
        avatar: 'avatar',
      },
    ],
    upVote: jest.fn(),
    downVote: jest.fn(),
  };

  it('test', () => {
    expect(SuggestedCommunitiesView(props)).toMatchSnapshot();
  });
});
