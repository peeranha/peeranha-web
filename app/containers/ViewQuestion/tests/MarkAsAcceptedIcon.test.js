import { MarkAsAcceptedIcon } from '../MarkAsAcceptedIcon';

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

describe('MarkAsAcceptedIcon', () => {
  it('test, return {}', () => {
    props.correct_answer_id = 1;
    props.answerId = 1;

    expect(MarkAsAcceptedIcon(props)).toMatchSnapshot();
  });

  it('test, return null', () => {
    expect(MarkAsAcceptedIcon(props)).toMatchSnapshot();
  });
});
