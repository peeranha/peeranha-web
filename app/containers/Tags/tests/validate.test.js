import { createTagValidator } from '../validate';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

describe('createTagValidator', () => {
  it('rating < MIN_RATING_TO_CREATE_TAG', () => {
    const profile = {
      rating: 100,
    };
    const translations = {};

    const isValid = createTagValidator(profile, translations);
    expect(isValid).toBe(false);
  });

  it('moderation_points < MIN_MOD_POINTS', () => {
    const profile = {
      rating: 100,
      moderation_points: 0,
    };
    const translations = {};

    const isValid = createTagValidator(profile, translations);
    expect(isValid).toBe(false);
  });

  it('rating > MIN_RATING_TO_CREATE_TAG', () => {
    const profile = {
      rating: 11000,
      moderation_points: 300,
    };
    const translations = {};

    const isValid = createTagValidator(profile, translations);
    expect(isValid).toBe(true);
  });
});
