import { showPopover } from '../popover';

window.$ = () => ({
  attr: jest.fn(),
  popover: jest.fn(),
});

describe('showPopover', () => {
  const elemId = 'id';
  const message = 'message';

  it('test', () => {
    expect(showPopover(elemId, message)).toBe(undefined);
  });
});
