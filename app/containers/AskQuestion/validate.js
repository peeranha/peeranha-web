import { showPopover } from 'utils/popover';
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

    showPopover(postButtonId, message);
    return false;
  }

  return true;
};
