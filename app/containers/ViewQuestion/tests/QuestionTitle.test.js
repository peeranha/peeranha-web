import { QuestionTitle } from '../QuestionTitle';

describe('QuestionTitle', () => {
  it('test', () => {
    const props = {
      title: 'title',
    };
    expect(QuestionTitle(props)).toMatchSnapshot();
  });
});
