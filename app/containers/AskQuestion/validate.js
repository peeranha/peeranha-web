import { getActivePopover } from 'utils/popover';
import messages from './messages';

export const postQuestionValidator = (
  profileInfo,
  postButtonId,
  translations,
) => {
  const minRatingToAskQuestion = 0;

  if (profileInfo.rating < minRatingToAskQuestion) {
    const message = `${
      translations[messages.notEnoughRating.id]
    } ${minRatingToAskQuestion}`;
    getActivePopover(postButtonId, message);
    throw new Error(message);
  }
};
