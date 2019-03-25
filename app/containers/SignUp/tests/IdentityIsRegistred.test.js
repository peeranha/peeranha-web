import IdentityIsRegistred from '../IdentityIsRegistred';

describe('IdentityIsRegistred', () => {
  it('snapshot tests', () => {
    expect(IdentityIsRegistred({})).toMatchSnapshot();
  });
});
