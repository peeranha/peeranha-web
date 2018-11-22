import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';

import { postQuestionValidator } from '../validate';
import messages from '../messages';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

const locale = 'en';

let profileInfo;
let postButtonId;
let translations;

beforeEach(() => {
  profileInfo = {
    onwer: 'user1',
    rating: 0,
  };

  postButtonId = 'postButtonId';
  translations = translationMessages[locale];
});

describe('postQuestionValidator', () => {
  it('profileInfo.rating < minRatingToAskQuestion', () => {
    try {
      profileInfo.rating = -10;
      postQuestionValidator(profileInfo, postButtonId, translations);
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${0}`,
      );
    }
  });

  it('profileInfo.rating > minRatingToAskQuestion', () => {
    profileInfo.rating = 10;

    const calling = postQuestionValidator(
      profileInfo,
      postButtonId,
      translations,
    );

    expect(calling).toBe(true);
  });
});
