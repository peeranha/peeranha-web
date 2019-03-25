import Team from '../Team';

const props = {
  translations: {},
};

describe('Team', () => {
  it('test', () => {
    expect(Team(props)).toMatchSnapshot();
  });
});
