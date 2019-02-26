import { QuestionForProfilePage } from '../index';

const props = {
  myPostRating: 10,
  title: 'title',
  myPostTime: 1551178856239,
  locale: 'en',
  acceptedAnswer: true,
  communities: [],
  id: '101010',
  community_id: '10100101',
  postType: 'question',
  isMyAnswerAccepted: true,
  isTheLargestRating: true,
  route: '/users/user1#questions',
};

describe('QuestionForProfilePage', () => {
  it('snapshot test', () => {
    expect(QuestionForProfilePage(props)).toMatchSnapshot();
  });
});
