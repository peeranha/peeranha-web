import About from '../About';

const props = {};

describe('About', () => {
  it('test1', () => {
    expect(About(props)).toMatchSnapshot();
  });
});
