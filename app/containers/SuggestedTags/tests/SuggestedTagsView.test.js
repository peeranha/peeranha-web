import SuggestedTagsView from '../SuggestedTagsView';

describe('SuggestedTagsView', () => {
  const props = {
    tags: [
      {
        id: 1,
        creator: 'user',
        upvotes: ['user1'],
        downvotes: ['user2'],
        name: 'name',
        description: 'description',
        avatar: 'avatar',
      },
    ],
    upVote: jest.fn(),
    downVote: jest.fn(),
  };

  it('test', () => {
    expect(SuggestedTagsView(props)).toMatchSnapshot();
  });
});
