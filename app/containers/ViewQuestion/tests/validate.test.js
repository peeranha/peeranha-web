/* eslint no-empty: 0 */
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
  deleteCommentValidator,
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

  showPopover.mockClear();

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

    it('item was upvoted or downvoted', () => {
      questionData.votingStatus.isUpVoted = true;

      try {
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translations,
          postButtonId,
          item,
        );
      } catch (err) {}

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.cannotCompleteBecauseVoted.id],
      );
    });

    it('itemData.user === profileInfo.user', () => {
      questionData.user = 'user';
      profileInfo.user = 'user';

      try {
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translations,
          postButtonId,
          item,
        );
      } catch (err) {}

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.noRootsToVote.id],
      );
    });

    it('itemData.votingStatus.isVotedToDelete', () => {
      questionData.user = 'user12';
      questionData.votingStatus.isVotedToDelete = true;

      try {
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translations,
          postButtonId,
          item,
        );
      } catch (err) {}

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.youVoted.id],
      );
    });

    it('profileInfo.rating < minRatingToVoteToDelete', () => {
      profileInfo.rating = 10;
      questionData.user = 'user22';
      questionData.votingStatus.isVotedToDelete = false;

      try {
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translations,
          postButtonId,
          item,
        );
      } catch (err) {}

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} 100`,
      );
    });

    it('profileInfo.energy <= minEnergy', () => {
      profileInfo.rating = 200;
      profileInfo.energy = -1;
      questionData.user = 'user22';
      questionData.votingStatus.isVotedToDelete = false;

      try {
        voteToDeleteValidator(
          profileInfo,
          questionData,
          translations,
          postButtonId,
          item,
        );
      } catch (err) {}

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughEnergy.id]} 3`,
      );
    });
  });
});

describe('deleteQuestionValidator', () => {
  it('answersNum > answersLimit', () => {
    const answersNum = 100;

    try {
      deleteQuestionValidator(
        postButtonId,
        answersNum,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      translations[messages.youHaveAnswers.id],
    );
  });

  it('profile.energy < minEnergy', () => {
    const answersNum = 0;

    profileInfo.rating = 100;
    profileInfo.energy = 0;

    try {
      deleteQuestionValidator(
        postButtonId,
        answersNum,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      `${translations[messages.notEnoughEnergy.id]} ${2}`,
    );
  });

  it('passed validation successully', () => {
    const answersNum = 0;

    profileInfo.rating = 100;
    profileInfo.energy = 100;

    try {
      deleteQuestionValidator(
        postButtonId,
        answersNum,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).not.toHaveBeenCalled();
  });
});

describe('deleteAnswerValidator', () => {
  it('+answerid === correctAnswerId', () => {
    const answerid = 100;
    const correctAnswerId = 100;

    try {
      deleteAnswerValidator(
        postButtonId,
        answerid,
        correctAnswerId,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      translations[messages.answerIsCorrect.id],
    );
  });

  it('profile.energy < minEnergy', () => {
    const answerid = 1;
    const correctAnswerId = 2;

    profileInfo.rating = 100;
    profileInfo.energy = 0;

    try {
      deleteAnswerValidator(
        postButtonId,
        answerid,
        correctAnswerId,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      `${translations[messages.notEnoughEnergy.id]} ${2}`,
    );
  });

  it('passed validation successully', () => {
    const answerid = 100010;
    const correctAnswerId = 100;

    try {
      deleteAnswerValidator(
        postButtonId,
        answerid,
        correctAnswerId,
        translations,
        profileInfo,
      );
    } catch (err) {}

    expect(showPopover).not.toHaveBeenCalled();
  });
});

describe('deleteCommentValidator', () => {
  it('profile.energy < minEnergy', () => {
    profileInfo.rating = 100;
    profileInfo.energy = 0;

    try {
      deleteCommentValidator(profileInfo, postButtonId, translations);
    } catch (err) {}

    expect(showPopover).toHaveBeenCalledWith(
      postButtonId,
      `${translations[messages.notEnoughEnergy.id]} ${1}`,
    );
  });
});

describe('downVoteValidator', () => {
  it('item was reported', () => {
    try {
      questionData.votingStatus.isVotedToDelete = true;

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
        translations[messages.cannotCompleteBecauseBlocked.id],
      );
    }
  });

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

  it('profileInfo.energy < minEenrgy', () => {
    try {
      questionData.user = 'user1';
      profileInfo.user = 'user2';
      profileInfo.rating = 120;
      profileInfo.energy = 0;
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
        `${translations[messages.notEnoughEnergy.id]} ${5}`,
      );
    }
  });

  it('passed validation successully', () => {
    questionData.user = 'user1';
    profileInfo.user = 'user2';
    profileInfo.rating = 10000;
    profileInfo.energy = 250;
    answerId = 0;

    try {
      downVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {}

    expect(showPopover).not.toHaveBeenCalled();
  });
});

describe('upVoteValidator', () => {
  it('item was reported', () => {
    try {
      questionData.votingStatus.isVotedToDelete = true;

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
        translations[messages.cannotCompleteBecauseBlocked.id],
      );
    }
  });

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

  it('profileInfo.energy < minEnergy', () => {
    try {
      questionData.user = 'user1';
      profileInfo.user = 'user2';
      profileInfo.rating = 120;
      profileInfo.energy = 0;
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
        `${translations[messages.notEnoughEnergy.id]} ${1}`,
      );
    }
  });

  it('passed validation successully', () => {
    profileInfo.rating = 100000;
    questionData.user = 'user1';
    profileInfo.user = 'user2';
    answerId = 0;

    try {
      upVoteValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {}

    expect(showPopover).not.toHaveBeenCalled();
  });
});

describe('markAsAcceptedValidator', () => {
  it('profileInfo.user !== questionData.user', () => {
    try {
      profileInfo.user = 'user1';
      questionData.user = 'user2';

      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        translations[messages.noRootsToVote.id],
      );
    } catch (err) {}
  });

  it('profileInfo.rating < minRating', () => {
    try {
      profileInfo.user = 'user1';
      profileInfo.rating = -1;
      questionData.user = 'user2';

      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughRating.id]} 0`,
      );
    } catch (err) {}
  });

  it('profileInfo.energy < minEnergy', () => {
    try {
      profileInfo.user = 'user1';
      profileInfo.rating = 100;
      profileInfo.energy = 0;
      questionData.user = 'user2';

      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );

      expect(showPopover).toHaveBeenCalledWith(
        postButtonId,
        `${translations[messages.notEnoughEnergy.id]} 1`,
      );
    } catch (err) {}
  });

  it('passed validation successully', () => {
    profileInfo.user = 'user1';
    questionData.user = 'user1';
    questionData.rating = 100;
    questionData.energy = 100;

    try {
      markAsAcceptedValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {}

    expect(showPopover).not.toHaveBeenCalled();
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

  it('not enought energy', () => {
    try {
      answerId = 0;
      profileInfo.rating = 200;
      profileInfo.energy = 0;
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
        `${translations[messages.notEnoughEnergy.id]} ${4}`,
      );
    }
  });

  it('passed validation successully', () => {
    profileInfo.user = 'user2';
    profileInfo.rating = 1000;
    profileInfo.energy = 250;
    questionData.answers = [];

    try {
      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        answerId,
        translations,
      );
    } catch (err) {
      expect(showPopover).not.toHaveBeenCalled();
    }
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

  it('not enough energy', () => {
    try {
      profileInfo.user = 'user2';
      profileInfo.rating = 1000;
      profileInfo.energy = 0;
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
        `${translations[messages.notEnoughEnergy.id]} ${6}`,
      );
    }
  });

  it('passed validation successully', () => {
    profileInfo.user = 'user2';
    profileInfo.rating = 1000;
    profileInfo.energy = 250;
    questionData.answers = [];

    try {
      postAnswerValidator(
        profileInfo,
        questionData,
        postButtonId,
        translations,
      );
    } catch (err) {
      expect(showPopover).not.toHaveBeenCalled();
    }
  });
});
