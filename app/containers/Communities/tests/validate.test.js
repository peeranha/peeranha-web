import { translationMessages } from 'i18n';
import { createCommunityValidator } from '../validate';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

describe('createCommunityValidator', () => {
  const translations = translationMessages.en;

  it('rating < MIN_RATING_TO_CREATE_COMMUNITY', () => {
    const profile = {
      rating: 1000,
    };

    const isValid = createCommunityValidator(profile, translations);
    expect(isValid).toBe(false);
  });

  it('profile.moderation_points < MIN_MOD_POINTS', () => {
    const profile = {
      rating: 5000,
      moderation_points: 2,
    };

    const isValid = createCommunityValidator(profile, translations);
    expect(isValid).toBe(false);
  });

  it('rating > MIN_RATING_TO_CREATE_COMMUNITY', () => {
    const profile = {
      rating: 11000,
    };

    const isValid = createCommunityValidator(profile, translations);
    expect(isValid).toBe(true);
  });
});
