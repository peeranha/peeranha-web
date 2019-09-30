import { View } from '../View';

const props = {
  translations: {},
  questionsList: [],
  questionsLoading: false,
  locale: 'en',
};

describe('View', () => {
  it('snapshot test 1', () => {
    expect(View(props)).toMatchSnapshot();
  });

  it('snapshot test 2', () => {
    props.questionsList = ['cheburek'];
    expect(View(props)).toMatchSnapshot();
  });

  it('snapshot test 3', () => {
    props.questionsLoading = true;
    expect(View(props)).toMatchSnapshot();
  });
});
