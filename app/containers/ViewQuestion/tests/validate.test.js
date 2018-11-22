import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';

import {
  postAnswerValidator,
  postCommentValidator,
  markAsAcceptedValidator,
  upVoteValidator,
  downVoteValidator,
} from '../validate';
import messages from '../messages';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

const locale = 'en';

let answerId;
let profileInfo;
let questionData;
let postButtonId;
let translations;

beforeEach(() => {
  profileInfo = {
    onwer: 'user1',
    rating: 0,
  };

  questionData = {
    answers: [],
    comments: [],
    user: 'user1',
  };

  postButtonId = 'postButtonId';
  answerId = 0;
  translations = translationMessages[locale];
});

describe('downVoteValidator', () => {
  it('(questionData.user === profileInfo.owner && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)', () => {
    try {
      questionData.user = 'user1';
      profileInfo.owner = 'user1';
      answerId = 0;

      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.noRootsToVote.id],
      );
    }
  });

  it('profileInfo.rating < minRatingToDownvote', () => {
    try {
      questionData.user = 'user1';
      profileInfo.owner = 'user2';
      profileInfo.rating = 0;
      answerId = 0;

      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${100}`,
      );
    }
  });
});

describe('upVoteValidator', () => {
  it('(questionData.user === profileInfo.owner && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)', () => {
    try {
      questionData.user = 'user1';
      profileInfo.owner = 'user1';
      answerId = 0;

      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.noRootsToVote.id],
      );
    }
  });

  it('profileInfo.rating < minRatingToUpvote', () => {
    try {
      questionData.user = 'user1';
      profileInfo.owner = 'user2';
      profileInfo.rating = 0;
      answerId = 0;

      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${35}`,
      );
    }
  });
});

describe('markAsAcceptedValidator', () => {
  it('profileInfo.owner !== questionData.user', () => {
    try {
      profileInfo.owner = 'user1';
      questionData.user = 'user2';

      markAsAcceptedValidator(profileInfo, questionData);
    } catch (err) {
      expect(err.message).toBe(`No roots to complete this action`);
    }
  });

  it('passed validation successully', () => {
    profileInfo.owner = 'user1';
    questionData.user = 'user1';

    const calling = markAsAcceptedValidator(profileInfo, questionData);

    expect(calling).toBe(true);
  });
});

describe('postCommentValidator', () => {
  it('questionData.comments.length === maxCommentsNumber', () => {
    try {
      questionData.comments.length = 200;
      postCommentValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.itemsMax.id],
      );
    }
  });

  it('((questionData.user === profileInfo.owner && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.owner)) && profileInfo.rating < minRatingForMyItem', () => {
    try {
      answerId = 0;
      profileInfo.rating = -100;
      profileInfo.owner = 'user1';
      questionData.user = 'user1';

      postCommentValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${0}`,
      );
    }
  });

  it('((questionData.user !== profileInfo.owner && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user !== profileInfo.owner)) && profileInfo.rating < minRatingForOtherItems', () => {
    try {
      answerId = 0;
      profileInfo.rating = -100;
      profileInfo.owner = 'user2';
      questionData.user = 'user1';

      postCommentValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${30}`,
      );
    }
  });

  it('passed validation successully', () => {
    profileInfo.owner = 'user2';
    profileInfo.rating = 1000;
    questionData.answers = [];

    const calling = postAnswerValidator(
      profileInfo,
      questionData,
      postButtonId,
      answerId,
      translations,
    );

    expect(calling).toBe(true);
  });
});

describe('postAnswerValidator', () => {
  it('questionData.answers.length === maxAnswersNumber', () => {
    try {
      questionData.answers.length = 200;
      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.itemsMax.id],
      );
    }
  });

  it('questionData.answers.length === maxAnswersNumber', () => {
    try {
      profileInfo.owner = 'user1';
      questionData.answers = [
        {
          user: 'user1',
        },
      ];

      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.alreadyAnswered.id]}`,
      );
    }
  });

  it('questionData.user === profileInfo.owner && profileInfo.rating < minRatingForMyQuestion', () => {
    try {
      profileInfo.owner = 'user1';
      profileInfo.rating = -10;
      questionData.answers = [];

      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${0}`,
      );
    }
  });

  it('questionData.user !== profileInfo.owner && profileInfo.rating < minRatingForOtherQuestions', () => {
    try {
      profileInfo.owner = 'user2';
      profileInfo.rating = -10;
      questionData.answers = [];

      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {
      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} ${10}`,
      );
    }
  });

  it('passed validation successully', () => {
    profileInfo.owner = 'user2';
    profileInfo.rating = 1000;
    questionData.answers = [];

    const calling = postAnswerValidator(
      profileInfo,
      questionData,
      postButtonId,
      translations,
    );

    expect(calling).toBe(true);
  });
});
