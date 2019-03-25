import Introduction from '../Introduction';

const props = {
  translations: {},
};

describe('Introduction', () => {
  it('test', () => {
    expect(Introduction(props)).toMatchSnapshot();
  });
});
