import { saveText, getText } from '../ipfs';

import {
  GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
  GET_QUESTIONS_KEY_TYPE,
  QUESTION_TABLE,
  USER_QUESTIONS_TABLE,
  ALL_QUESTIONS_SCOPE,
  POST_QUESTION_METHOD,
  EDIT_QUESTION_METHOD,
  DEL_QUESTION_METHOD,
  POST_ANSWER_METHOD,
  EDIT_ANSWER_METHOD,
  DEL_ANSWER_METHOD,
  POST_COMMENT_METHOD,
  EDIT_COMMENT_METHOD,
  DEL_COMMENT_METHOD,
  UP_VOTE_METHOD,
  DOWN_VOTE_METHOD,
  MARK_AS_CORRECT_METHOD,
  VOTE_TO_DELETE_METHOD,
  USER_ANSWERS_TABLE,
} from '../constants';

import {
  getQuestions,
  getQuestionsFilteredByCommunities,
  postQuestion,
  postAnswer,
  postComment,
  upVote,
  downVote,
  markAsAccepted,
  editQuestion,
  editAnswer,
  editComment,
  deleteAnswer,
  deleteComment,
  deleteQuestion,
  getAnswer,
  getAskedQuestion,
  voteToDelete,
  getQuestionsPostedByUser,
  getQuestionsForFollowedCommunities,
  FetcherOfQuestionsForFollowedCommunities,
  getAnswersPostedByUser,
  getQuestionById,
} from '../questionsManagement';

jest.mock('../ipfs', () => ({
  saveText: jest.fn().mockImplementation(() => {}),
  getText: jest.fn().mockImplementation(() => '{}'),
}));

let eosService;

beforeEach(() => {
  eosService = {
    sendTransaction: jest.fn(),
    getTableRow: jest.fn(),
    getTableRows: jest.fn(),
  };
});

describe('getAnswersPostedByUser', () => {
  const user = 'user1';
  const offset = 10;
  const limit = 10;

  const answers = [1, 2, 3];

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => answers);

    expect(
      await getAnswersPostedByUser(eosService, user, offset, limit),
    ).toEqual(answers);

    expect(eosService.getTableRows).toHaveBeenCalledWith(
      USER_ANSWERS_TABLE,
      user,
      offset,
      limit,
    );
  });
});

/* eslint-disable */
describe('FetcherOfQuestionsForFollowedCommunities', () => {
  let firstFetchCount = 30;
  let communities = [1, 2, 3];

  eosService = {
    sendTransaction: jest.fn(),
    getTableRow: jest.fn(),
    getTableRows: jest.fn(),
  };

  describe('constructor', () => {
    const fetcher = new FetcherOfQuestionsForFollowedCommunities(
      firstFetchCount,
      communities,
      eosService,
    );

    it('communities.length 0', () => {
      communities = [];
      const fetch = fetcher.constructor(
        firstFetchCount,
        communities,
        eosService,
      );

      expect(fetch).toBe(null);
    });

    it('communities.length > 0', () => {
      communities = [1, 2, 3];
      fetcher.constructor(firstFetchCount, communities, eosService);

      expect(fetcher.eosService).toEqual(eosService);
      expect(fetcher.firstFetchCount).toEqual(firstFetchCount);
      expect(fetcher.hasMore).toEqual(true);
      expect(fetcher.eosService).toEqual(eosService);

      expect(fetcher.communitiesMap[communities[0]]).toEqual({
        items: [],
        lowerBound: `${BigInt(communities[0]) << BigInt(36)}`,
        lastKeyFetched: `${BigInt(communities[0]) << BigInt(36)}`,
        uppperBound: `${BigInt(communities[0] + 1) << BigInt(36)}`,
        more: true,
      });
    });
  });

  describe('getNextItems', async () => {
    communities = [1];

    let fetchCount = 10;
    const fetcher = new FetcherOfQuestionsForFollowedCommunities(
      firstFetchCount,
      communities,
      eosService,
    );

    await fetcher.constructor(firstFetchCount, communities, eosService);

    it('hasMore FALSE', async () => {
      fetcher.hasMore = false;
      const fetch = await fetcher.getNextItems(fetchCount);
      expect(fetch).toEqual([]);
    });

    describe('fetch_res.length', () => {
      const v0 = 3;
      const v1 = 2;
      const v2 = 1;

      fetcher.hasMore = true;

      it('fetch_res.length === limit', async () => {
        fetcher.firstFetchCount = v1;
        fetcher.communitiesMap[communities[0]].items.length = v2;

        const ID = 1;

        fetcher.eosService.getTableRows.mockImplementation(() => [{ id: ID }]);

        const fetch = await fetcher.getNextItems(fetchCount);
        expect(fetcher.communitiesMap[communities[0]].lastKeyFetched).toEqual(
          `${fetcher.communitiesMap[communities[0]].lowerBound +
            BigInt(ID) +
            BigInt(1)}`,
        );
      });

      it('fetch_res.length !== limit', async () => {
        fetcher.firstFetchCount = v0;
        fetcher.communitiesMap[communities[0]].items.length = v2;

        const ID = 1;

        fetcher.eosService.getTableRows.mockImplementation(() => [{ id: ID }]);
        expect(fetcher.communitiesMap[communities[0]].more).toBe(false);
      });
    });

    describe('hasMore TRUE', async () => {
      fetcher.hasMore = true;
      const fetch = await fetcher.getNextItems(fetchCount);

      it('!this.communitiesMap[community_id].more', () => {
        fetcher.communitiesMap[communities[0]].more = false;
        fetcher.communitiesMap[communities[0]].items.length = 2 * fetchCount;
        expect(fetch).toBe(null);
      });

      it('this.communitiesMap[community_id].more TRUE && fetcher.communitiesMap[communities[0]].items.length < fetchCount', () => {
        fetcher.communitiesMap[communities[0]].more = true;
        fetcher.communitiesMap[communities[0]].items.length = Math.floor(
          0.5 * fetchCount,
        );

        expect(fetch.eosService.getTableRows).toHaveBeenCalledWith(
          QUESTION_TABLE,
          ALL_QUESTIONS_SCOPE,
          fetcher.communitiesMap[communities[0]].lastKeyFetched,
          limit,
          fetcher.communitiesMap[communities[0]].uppperBound,
          GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
          GET_QUESTIONS_KEY_TYPE,
        );
      });
    });

    it('fetch.eosService.getTableRows => [1, 2]', async () => {
      const items = [1, 2];

      fetcher.hasMore = true;
      fetch.eosService.getTableRows.mockImplementation(() => items);

      const fetch = await fetcher.getNextItems(fetchCount);
      expect(fetcher.communitiesMap[communities[0]].items).toEqual([
        ...fetcher.communitiesMap[communities[0]].items,
        ...items,
      ]);
    });

    it('this.communitiesMap[community_id].items.length < fetchCount', async () => {
      const MIN_ID = 1;

      fetchCount = 10;
      fetcher.hasMore = true;
      this.communitiesMap[community_id].items = [
        { id: MIN_ID },
        { id: 2 * MIN_ID },
        { id: 3 * MIN_ID },
      ];

      const fetch = await fetcher.getNextItems(fetchCount);

      expect(fetcher.hasMore).toBe(false);
      expect(fetch).toEqual(fetcher.communitiesMap[MIN_ID].items[0]);
    });
  });
});
/* eslint-enable */

describe('getQuestionsForFollowedCommunities', () => {
  const questionsExpected = [];
  const limit = 10;
  const fetcher = {
    getNextItems: jest.fn().mockImplementation(() => questionsExpected),
  };

  it('test', async () => {
    const questions = await getQuestionsForFollowedCommunities(limit, fetcher);
    expect(fetcher.getNextItems).toHaveBeenCalledWith(limit);
    expect(questions).toEqual(questionsExpected);
  });
});

describe('getQuestionsPostedByUser', async () => {
  const user = 'user1';
  const questionsMass = [];
  eosService.getTableRows.mockImplementation(() => questionsMass);

  const questions = await getQuestionsPostedByUser(eosService, user);

  it('test', () => {
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      USER_QUESTIONS_TABLE,
      user,
      0,
    );

    expect(questions).toEqual(questionsMass);
  });
});

/* eslint-disable  */
describe('getQuestionsFilteredByCommunities', () => {
  const questions = [
    {
      id: 1,
    },
  ];

  const limit = 10;
  const offset = 10;
  const communityId = 10;

  it('test1', async () => {
    eosService.getTableRows.mockImplementation(() => questions);

    const getQuestions = await getQuestionsFilteredByCommunities(
      eosService,
      limit,
      offset,
      communityId,
    );

    expect(getQuestions).toEqual(questions);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      String((BigInt(communityId) << BigInt(36)) + BigInt(offset)),
      limit,
      String(BigInt(communityId + 1) << BigInt(36)),
      GET_QUESTIONS_FILTERED_BY_COMMUNITY_INDEX_POSITION,
      GET_QUESTIONS_KEY_TYPE,
    );
  });
});
/* eslint-enable  */

describe('getAskedQuestion', async () => {
  const link = 'link';
  const question = JSON.stringify({});

  getText.mockImplementation(() => question);
  const questionObject = await getAskedQuestion(link);

  it('test', () => {
    expect(questionObject).toBe(JSON.parse(question));
  });
});

describe('getAnswer', async () => {
  const link = 'link';
  const answer = 'answer';

  getText.mockImplementation(() => answer);
  const answerTxt = await getAnswer(link);

  it('test', () => {
    expect(answerTxt).toBe(answer);
  });
});

describe('deleteQuestion', () => {
  const user = 'user';
  const questionId = 10;

  it('test', async () => {
    await deleteQuestion(user, questionId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_QUESTION_METHOD,
      {
        user,
        question_id: +questionId,
      },
    );
  });
});

describe('deleteAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;

  it('test', async () => {
    await deleteAnswer(user, questionId, answerId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('deleteComment', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const commentId = 10;

  it('test', async () => {
    await deleteComment(user, questionId, answerId, commentId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DEL_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        comment_id: +commentId,
      },
    );
  });
});

describe('editComment', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const commentId = 10;
  const ipfsLink = 'ipfsLink';
  const textComment = 'textComment';

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editComment(
      user,
      questionId,
      answerId,
      commentId,
      textComment,
      eosService,
    );

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        comment_id: +commentId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('editAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 10;
  const ipfsLink = 'ipfsLink';
  const textAnswer = 'textAnswer';

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editAnswer(user, questionId, answerId, textAnswer, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('editQuestion', () => {
  const user = 10;
  const id = 10;
  const ipfsLink = 'ipfsLink';
  const value = 12;

  const question = {
    title: 'title',
    community: {
      value,
      id: 1,
      name: 'com1',
      tags: [
        {
          id: 1,
          name: 'tag1',
        },
      ],
    },
    chosenTags: [
      {
        value,
      },
    ],
  };

  saveText.mockImplementation(() => ipfsLink);

  it('test', async () => {
    await editQuestion(user, id, question, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      EDIT_QUESTION_METHOD,
      {
        user,
        question_id: +id,
        title: question.title,
        ipfs_link: ipfsLink,
        community_id: value,
        tags: [value],
      },
    );
  });
});

describe('getQuestions', () => {
  const limit = 10;
  const offset = 10;
  const questionsMass = [];

  it('test', async () => {
    eosService.getTableRows.mockImplementation(() => questionsMass);

    const questions = await getQuestions(eosService, limit, offset);

    expect(questions).toEqual(questionsMass);
    expect(eosService.getTableRows).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      offset,
      limit,
    );
  });
});

describe('postQuestion', () => {
  const value = 12;
  const user = 'user';

  const questionData = {
    community: {
      value,
      id: 1,
      name: 'com1',
      tags: [
        {
          id: 1,
          name: 'tag1',
        },
      ],
    },
    chosenTags: [
      {
        value,
      },
    ],
  };
  const questionInfo = { info: 'questionInfo' };
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    eosService.sendTransaction.mockImplementation(() => questionInfo);

    saveText.mockImplementation(() => ipfsLink);

    const question = await postQuestion(user, questionData, eosService);
    expect(question).toEqual(questionInfo);
    expect(saveText).toHaveBeenCalledWith(JSON.stringify(questionData));
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_QUESTION_METHOD,
      {
        user,
        title: questionData.title,
        ipfs_link: ipfsLink,
        community_id: value,
        tags: [value],
      },
    );
  });
});

describe('postAnswer', () => {
  const user = 'user';
  const questionId = 10;
  const answer = 'answer';
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    saveText.mockImplementation(() => ipfsLink);

    await postAnswer(user, questionId, answer, eosService);
    expect(saveText).toHaveBeenCalledWith(answer);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_ANSWER_METHOD,
      {
        user,
        question_id: +questionId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('postComment', () => {
  const user = 'user';
  const comment = 'comment';
  const questionId = 10;
  const answerId = 50;
  const ipfsLink = 'ipfsLink';

  it('test', async () => {
    saveText.mockImplementation(() => ipfsLink);

    await postComment(user, questionId, answerId, comment, eosService);
    expect(saveText).toHaveBeenCalledWith(comment);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      POST_COMMENT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        ipfs_link: ipfsLink,
      },
    );
  });
});

describe('upVote', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await upVote(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      UP_VOTE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('downVote', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await downVote(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      DOWN_VOTE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('voteToDelete', () => {
  const user = 'user';
  const questionId = 10;
  let commentId = 10;
  let answerId = 50;

  it('test, answerId, commentId - falsy', async () => {
    commentId = undefined;
    answerId = undefined;

    await voteToDelete(user, questionId, answerId, commentId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      VOTE_TO_DELETE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: 0,
        comment_id: 0,
      },
    );
  });

  it('test, answerId, commentId - true', async () => {
    commentId = 10;
    answerId = 10;

    await voteToDelete(user, questionId, answerId, commentId, eosService);

    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      VOTE_TO_DELETE_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
        comment_id: +commentId,
      },
    );
  });
});

describe('markAsAccepted', () => {
  const user = 'user';
  const questionId = 10;
  const answerId = 50;

  it('test', async () => {
    await markAsAccepted(user, questionId, answerId, eosService);
    expect(eosService.sendTransaction).toHaveBeenCalledWith(
      user,
      MARK_AS_CORRECT_METHOD,
      {
        user,
        question_id: +questionId,
        answer_id: +answerId,
      },
    );
  });
});

describe('getQuestionById', () => {
  const questionId = 10;
  const questionInfo = {
    answers: [],
  };

  it('test', async () => {
    eosService.getTableRow.mockImplementation(() => questionInfo);

    expect(await getQuestionById(eosService, questionId)).toEqual(questionInfo);
    expect(eosService.getTableRow).toHaveBeenCalledWith(
      QUESTION_TABLE,
      ALL_QUESTIONS_SCOPE,
      questionId,
    );
  });
});
