import { ContentRating } from '../ContentRating';

describe('ContentRating', () => {
  const props = {
    upVote: jest.fn(),
    downVote: jest.fn(),
    votingStatus: {},
    userInfo: {
      user: 'user123',
    },
    questionData: {
      correct_answer_id: 0,
    },
  };

  it('snapshot test', () => {
    expect(ContentRating(props)).toMatchSnapshot();
  });
});
