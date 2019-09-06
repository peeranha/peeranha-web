import { Banner } from '../Banner';

describe('Banner', () => {
  it('test', () => {
    expect(Banner()).toMatchSnapshot();
  });
});
