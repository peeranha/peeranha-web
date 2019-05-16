import { translationMessages } from 'i18n';
import { showPopover } from 'utils/popover';

import {
  postAnswerValidator,
  postCommentValidator,
  markAsAcceptedValidator,
  upVoteValidator,
  downVoteValidator,
  deleteQuestionValidator,
  deleteAnswerValidator,
  voteToDeleteValidator,
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
    votingStatus: {},
  };

  postButtonId = 'postButtonId';
  answerId = 0;
  translations = translationMessages[locale];
});

describe('voteToDeleteValidator', () => {
  const item = {
    questionId: 1,
    answerId: 1,
    commentId: 1,
  };

  describe('itemData is question', () => {
    item.answerId = null;
    item.commentId = null;

    it('itemData.user === profileInfo.user', () => {
      questionData.user = 'user';
      profileInfo.user = 'user';

      voteToDeleteValidator(
        profileInfo,
        questionData,
        translations,
        postButtonId,
        item,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.noRootsToVote.id],
      );
    });

    it('itemData.votingStatus.isVotedToDelete', () => {
      questionData.user = 'user12';
      questionData.votingStatus.isVotedToDelete = true;

      voteToDeleteValidator(
        profileInfo,
        questionData,
        translations,
        postButtonId,
        item,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.youVoted.id],
      );
    });

    it('profileInfo.rating < minRatingToVoteToDelete', () => {
      profileInfo.rating = 10;
      questionData.user = 'user22';
      questionData.votingStatus.isVotedToDelete = false;

      voteToDeleteValidator(
        profileInfo,
        questionData,
        translations,
        postButtonId,
        item,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} 100`,
      );
    });

    it('profileInfo.moderation_points <= minModerationPoints', () => {
      profileInfo.rating = 200;
      profileInfo.moderation_points = 0;
      questionData.user = 'user22';
      questionData.votingStatus.isVotedToDelete = false;

      voteToDeleteValidator(
        profileInfo,
        questionData,
        translations,
        postButtonId,
        item,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughModPoints.id]} 0`,
      );
    });
  });
});

describe('deleteQuestionValidator', () => {
  it('answersNum > answersLimit', () => {
    const answersNum = 100;

    deleteQuestionValidator(postButtonId, answersNum, translations);

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      translations[messages.youHaveAnswers.id],
    );
  });

  it('passed validation successully', () => {
    const answersNum = 0;

    const calling = deleteQuestionValidator(
      postButtonId,
      answersNum,
      translations,
    );

    expect(calling).toBe(true);
  });
});

describe('deleteAnswerValidator', () => {
  it('+answerid === correctAnswerId', () => {
    const answerid = 100;
    const correctAnswerId = 100;

    deleteAnswerValidator(
      postButtonId,
      answerid,
      correctAnswerId,
      translations,
    );

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      translations[messages.answerIsCorrect.id],
    );
  });

  it('passed validation successully', () => {
    const answerid = 100010;
    const correctAnswerId = 100;

    const calling = deleteAnswerValidator(
      postButtonId,
      answerid,
      correctAnswerId,
      translations,
    );

    expect(calling).toBe(true);
  });
});

describe('downVoteValidator', () => {
  it('(questionData.user === profileInfo.user && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)', () => {
    try {
      questionData.user = 'user1';
      profileInfo.user = 'user1';
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
      profileInfo.user = 'user2';
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

  it('passed validation successully', () => {
    questionData.user = 'user1';
    profileInfo.user = 'user2';
    profileInfo.rating = 10000;
    answerId = 0;

    const calling = downVoteValidator(
      profileInfo,
      questionData,
      postButtonId,
      answerId,
      translations,
    );

    expect(calling).toBe(true);
  });
});

describe('upVoteValidator', () => {
  it('(questionData.user === profileInfo.user && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)', () => {
    try {
      questionData.user = 'user1';
      profileInfo.user = 'user1';
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
      profileInfo.user = 'user2';
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

  it('passed validation successully', () => {
    profileInfo.rating = 100000;
    questionData.user = 'user1';
    profileInfo.user = 'user2';
    answerId = 0;

    const calling = upVoteValidator(
      profileInfo,
      questionData,
      postButtonId,
      answerId,
      translations,
    );

    expect(calling).toBe(true);
  });
});

describe('markAsAcceptedValidator', () => {
  it('profileInfo.user !== questionData.user', () => {
    try {
      profileInfo.user = 'user1';
      questionData.user = 'user2';

      markAsAcceptedValidator(profileInfo, questionData);
    } catch (err) {
      expect(err.message).toBe(`No roots to complete this action`);
    }
  });

  it('passed validation successully', () => {
    profileInfo.user = 'user1';
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

  it('((questionData.user === profileInfo.user && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user === profileInfo.user)) && profileInfo.rating < minRatingForMyItem', () => {
    try {
      answerId = 0;
      profileInfo.rating = -100;
      profileInfo.user = 'user1';
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

  it('((questionData.user !== profileInfo.user && answerId == 0) || (isOwnItem[0] && isOwnItem[0].user !== profileInfo.user)) && profileInfo.rating < minRatingForOtherItems', () => {
    try {
      answerId = 0;
      profileInfo.rating = -100;
      profileInfo.user = 'user2';
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
    profileInfo.user = 'user2';
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
      profileInfo.user = 'user1';
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

  it('questionData.user === profileInfo.user && profileInfo.rating < minRatingForMyQuestion', () => {
    try {
      profileInfo.user = 'user1';
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

  it('questionData.user !== profileInfo.user && profileInfo.rating < minRatingForOtherQuestions', () => {
    try {
      profileInfo.user = 'user2';
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
    profileInfo.user = 'user2';
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
