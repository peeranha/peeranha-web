import { DefaultButton } from '../DefaultButton';

describe('DefaultButton', () => {
  it('test', () => {
    expect(DefaultButton({ communityIdFilter: 1 })).toMatchSnapshot();
  });
});
