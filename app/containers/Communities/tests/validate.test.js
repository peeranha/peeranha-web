import { createCommunityValidator } from '../validate';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

describe('createCommunityValidator', () => {
  it('rating < MIN_RATING_TO_CREATE_COMMUNITY', () => {
    const rating = 1000;
    const translations = {};

    const isValid = createCommunityValidator(rating, translations);
    expect(isValid).toBe(false);
  });

  it('rating > MIN_RATING_TO_CREATE_COMMUNITY', () => {
    const rating = 11000;
    const translations = {};

    const isValid = createCommunityValidator(rating, translations);
    expect(isValid).toBe(true);
  });
});
