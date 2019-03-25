import Footer from '../Footer';

const props = {
  translations: {},
};

describe('Footer', () => {
  it('test', () => {
    expect(Footer(props)).toMatchSnapshot();
  });
});
