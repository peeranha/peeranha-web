import React from 'react';
import { shallow } from 'enzyme';

import MarkAsAcceptedIcon, { renderIcon } from '../MarkAsAcceptedIcon';

let props;

beforeEach(() => {
  props = {
    correct_answer_id: 0,
    answerId: 0,
    questionFrom: 'Bob',
    account: 'Bob',
    whoWasAccepted: 'whoWasAccepted',
    markAsAccepted: jest.fn(),
  };
});

describe('renderIcon', () => {
  it('correct_answer_id === answer_id', () => {
    const returnedValue = {
      color: 'text-success',
      id: 0,
    };

    props.correct_answer_id = 1;
    props.answerId = 1;

    expect(renderIcon(props)).toEqual(returnedValue);
  });

  it('@questionFrom - Bob, active account - Bob; correct_answer_id !== answer_id', () => {
    const user = 'Bob';

    props.questionFrom = user;
    props.account = user;
    props.correct_answer_id = 1;
    props.answerId = 2;

    const returnedValue = {
      color: 'text-secondary',
      id: props.answerId,
    };

    expect(renderIcon(props)).toEqual(returnedValue);
  });

  it('else, other users', () => {
    props.questionFrom = 'Alice';
    props.account = 'Bob';

    expect(renderIcon(props)).toBe(null);
  });
});

describe('MarkAsAcceptedIcon', () => {
  it('test, return {}', () => {
    props.correct_answer_id = 1;
    props.answerId = 1;

    expect(MarkAsAcceptedIcon(props)).toMatchSnapshot();
  });

  it('test, return null', () => {
    expect(MarkAsAcceptedIcon(props)).toMatchSnapshot();
  });

  it('markAsAccepted click', () => {
    props.correct_answer_id = 1;
    props.answerId = 1;

    shallow(<MarkAsAcceptedIcon {...props} />)
      .find('.check')
      .simulate('click');

    expect(props.markAsAccepted).toHaveBeenCalledWith(0, props.whoWasAccepted);
  });
});
