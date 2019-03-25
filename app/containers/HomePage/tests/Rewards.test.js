import Rewards from '../Rewards';

const props = {
  translations: {},
};

describe('Rewards', () => {
  it('test', () => {
    expect(Rewards(props)).toMatchSnapshot();
  });
});
