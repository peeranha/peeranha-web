import SignUpOptions from '../SignUpOptions';

describe('SignUpOptions', () => {
  it('snapshot tests', () => {
    expect(SignUpOptions({})).toMatchSnapshot();
  });
});
