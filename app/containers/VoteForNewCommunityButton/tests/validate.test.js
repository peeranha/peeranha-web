import { upVoteValidator, downVoteValidator } from '../validate';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

describe('upVoteValidator', () => {
  const profile = {
    rating: 10,
  };
  const locale = 'en';
  let selectedAccount = 'user';
  const activeCommunity = {
    creator: null,
    voters: [],
  };
  const buttonId = 'buttonId';

  it('selectedAccount === activeCommunity.creator', () => {
    selectedAccount = 'user1';
    activeCommunity.creator = 'user1';

    const isValid = upVoteValidator(
      profile,
      locale,
      selectedAccount,
      activeCommunity,
      buttonId,
    );

    expect(isValid).toBe(false);
  });

  it('rating < MIN_RATING_TO_UPVOTE', () => {
    selectedAccount = 'user2';
    activeCommunity.creator = 'user1';
    activeCommunity.voters = [];
    profile.rating = 10;

    const isValid = upVoteValidator(
      profile,
      locale,
      selectedAccount,
      activeCommunity,
      buttonId,
    );

    expect(isValid).toBe(false);
  });

  it('rating > MIN_RATING_TO_UPVOTE', () => {
    selectedAccount = 'user2';
    activeCommunity.creator = 'user1';
    activeCommunity.voters = [];
    profile.rating = 1000;

    const isValid = upVoteValidator(
      profile,
      locale,
      selectedAccount,
      activeCommunity,
      buttonId,
    );

    expect(isValid).toBe(true);
  });
});

describe('downVoteValidator', () => {
  const profile = {
    rating: 10,
  };
  const locale = 'en';
  let selectedAccount = 'user';
  const activeCommunity = {
    creator: null,
    voters: [],
  };
  const buttonId = 'buttonId';

  it('rating < MIN_RATING_TO_DOWNVOTE', () => {
    selectedAccount = 'user2';
    activeCommunity.creator = 'user1';
    activeCommunity.voters = [];
    profile.rating = 10;

    const isValid = downVoteValidator(
      profile,
      locale,
      selectedAccount,
      activeCommunity,
      buttonId,
    );

    expect(isValid).toBe(false);
  });

  it('rating > MIN_RATING_TO_DOWNVOTE', () => {
    selectedAccount = 'user2';
    activeCommunity.creator = 'user1';
    activeCommunity.voters = [];
    profile.rating = 1000;

    const isValid = downVoteValidator(
      profile,
      locale,
      selectedAccount,
      activeCommunity,
      buttonId,
    );

    expect(isValid).toBe(true);
  });
});
