import React from 'react';

import { getFormattedDate } from 'utils/datetime';
import { QuestionForProfilePage } from '../index';

jest.mock('utils/datetime', () => ({
  getFormattedDate: jest.fn(),
}));

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
    getFormattedDate.mockImplementation(() => <div>postTime</div>);
    expect(QuestionForProfilePage(props)).toMatchSnapshot();
  });
});
