import { StyledButton } from '../StyledButton';

describe('StyledButton', () => {
  it('test', () => {
    expect(StyledButton({ communityIdFilter: 1 })).toMatchSnapshot();
  });
});
