import React from 'react';
import { shallow } from 'enzyme';

import ContentRating from '../ContentRating';

describe('ContentRating', () => {
  const props = {
    upVote: jest.fn(),
    downVote: jest.fn(),
    votingStatus: {},
    questionData: {
      correct_answer_id: 0,
    },
  };

  it('snapshot test', () => {
    expect(ContentRating(props)).toMatchSnapshot();
  });

  it('chevron-up click', () => {
    const wrapper = shallow(<ContentRating {...props} />);

    wrapper.find('.chevron-up').simulate('click');
    expect(props.upVote).toHaveBeenCalledWith(props.answerId);
  });

  it('chevron-down click', () => {
    const wrapper = shallow(<ContentRating {...props} />);

    wrapper.find('.chevron-down').simulate('click');
    expect(props.downVote).toHaveBeenCalledWith(props.answerId);
  });
});
