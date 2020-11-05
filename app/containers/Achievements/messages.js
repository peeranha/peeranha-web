/*
 * Achievements Messages
 *
 * This contains all the text for the Achievements component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  progressBarPopover: {
    ratingRelated: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.ratingRelated.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.ratingRelated.multiple',
      },
    },
    questionAskedRelated: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.questionAskedRelated.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.questionAskedRelated.multiple',
      },
    },
    answerGivenRelated: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.answerGivenRelated.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.answerGivenRelated.multiple',
      },
    },
    bestAnswerRelated: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.bestAnswerRelated.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.bestAnswerRelated.multiple',
      },
    },
    firstAnswerIn15Related: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.firstAnswerIn15Related.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.firstAnswerIn15Related.multiple',
      },
    },
    firstAnswerRelated: {
      single: {
        id:
          'app.containers.Achievements.progressBarPopover.firstAnswerRelated.single',
      },
      multiple: {
        id:
          'app.containers.Achievements.progressBarPopover.firstAnswerRelated.multiple',
      },
    },
  },

  // Answers and questions related achievements with levels

  QUESTION_ASKED_BRONZE: {
    title: {
      id: 'app.containers.Achievements.questionAsked.bronze.title',
    },
    description: {
      id: 'app.containers.Achievements.questionAsked.bronze.description',
    },
  },
  QUESTION_ASKED_SILVER: {
    title: {
      id: 'app.containers.Achievements.questionAsked.silver.title',
    },
    description: {
      id: 'app.containers.Achievements.questionAsked.silver.description',
    },
  },
  QUESTION_ASKED_GOLD: {
    title: {
      id: 'app.containers.Achievements.questionAsked.gold.title',
    },
    description: {
      id: 'app.containers.Achievements.questionAsked.gold.description',
    },
  },

  ANSWER_GIVEN_BRONZE: {
    title: {
      id: 'app.containers.Achievements.answerGiven.bronze.title',
    },
    description: {
      id: 'app.containers.Achievements.answerGiven.bronze.description',
    },
  },
  ANSWER_GIVEN_SILVER: {
    title: {
      id: 'app.containers.Achievements.answerGiven.silver.title',
    },
    description: {
      id: 'app.containers.Achievements.answerGiven.silver.description',
    },
  },
  ANSWER_GIVEN_GOLD: {
    title: {
      id: 'app.containers.Achievements.answerGiven.gold.title',
    },
    description: {
      id: 'app.containers.Achievements.answerGiven.gold.description',
    },
  },

  BEST_ANSWER_BRONZE: {
    title: {
      id: 'app.containers.Achievements.bestAnswer.bronze.title',
    },
    description: {
      id: 'app.containers.Achievements.bestAnswer.bronze.description',
    },
  },
  BEST_ANSWER_SILVER: {
    title: {
      id: 'app.containers.Achievements.bestAnswer.silver.title',
    },
    description: {
      id: 'app.containers.Achievements.bestAnswer.silver.description',
    },
  },
  BEST_ANSWER_GOLD: {
    title: {
      id: 'app.containers.Achievements.bestAnswer.gold.title',
    },
    description: {
      id: 'app.containers.Achievements.bestAnswer.gold.description',
    },
  },

  FIRST_ANSWER_IN_15_BRONZE: {
    title: {
      id: 'app.containers.Achievements.firstIn15.bronze.title',
    },
    description: {
      id: 'app.containers.Achievements.firstIn15.bronze.description',
    },
  },
  FIRST_ANSWER_IN_15_SILVER: {
    title: {
      id: 'app.containers.Achievements.firstIn15.silver.title',
    },
    description: {
      id: 'app.containers.Achievements.firstIn15.silver.description',
    },
  },
  FIRST_ANSWER_IN_15_GOLD: {
    title: {
      id: 'app.containers.Achievements.firstIn15.gold.title',
    },
    description: {
      id: 'app.containers.Achievements.firstIn15.gold.description',
    },
  },

  FIRST_ANSWER_BRONZE: {
    title: {
      id: 'app.containers.Achievements.firstAnswer.bronze.title',
    },
    description: {
      id: 'app.containers.Achievements.firstAnswer.bronze.description',
    },
  },
  FIRST_ANSWER_SILVER: {
    title: {
      id: 'app.containers.Achievements.firstAnswer.silver.title',
    },
    description: {
      id: 'app.containers.Achievements.firstAnswer.silver.description',
    },
  },
  FIRST_ANSWER_GOLD: {
    title: {
      id: 'app.containers.Achievements.firstAnswer.gold.title',
    },
    description: {
      id: 'app.containers.Achievements.firstAnswer.gold.description',
    },
  },

  // Rating related achievements

  WELCOME_STRANGER: {
    title: {
      id: 'app.containers.Achievements.welcomeStranger.title',
    },
    description: {
      id: 'app.containers.Achievements.welcomeStranger.description',
    },
  },
  NEWBIE: {
    title: {
      id: 'app.containers.Achievements.newbie.title',
    },
    description: {
      id: 'app.containers.Achievements.newbie.description',
    },
  },
  JUNIOR: {
    title: {
      id: 'app.containers.Achievements.junior.title',
    },
    description: {
      id: 'app.containers.Achievements.junior.description',
    },
  },
  RESIDENT: {
    title: {
      id: 'app.containers.Achievements.resident.title',
    },
    description: {
      id: 'app.containers.Achievements.resident.description',
    },
  },
  SENIOR: {
    title: {
      id: 'app.containers.Achievements.senior.title',
    },
    description: {
      id: 'app.containers.Achievements.senior.description',
    },
  },
  HERO: {
    title: {
      id: 'app.containers.Achievements.hero.title',
    },
    description: {
      id: 'app.containers.Achievements.hero.description',
    },
  },
  SUPERHERO: {
    title: {
      id: 'app.containers.Achievements.superhero.title',
    },
    description: {
      id: 'app.containers.Achievements.superhero.description',
    },
  },

  // Unique achievements

  FOUNDING_MEMBER: {
    title: {
      id: 'app.containers.Achievements.foundingMember.title',
    },
    description: {
      id: 'app.containers.Achievements.foundingMember.description',
    },
  },
  ACTIVIST: {
    title: {
      id: 'app.containers.Achievements.activist.title',
    },
    description: {
      id: 'app.containers.Achievements.activist.description',
    },
  },
  RESEARCHER: {
    title: {
      id: 'app.containers.Achievements.researcher.title',
    },
    description: {
      id: 'app.containers.Achievements.researcher.description',
    },
  },
  HONORABLE_RESIDENT: {
    title: {
      id: 'app.containers.Achievements.honorableResident.title',
    },
    description: {
      id: 'app.containers.Achievements.honorableResident.description',
    },
  },
  THE_WISEST: {
    title: {
      id: 'app.containers.Achievements.theWisest.title',
    },
    description: {
      id: 'app.containers.Achievements.theWisest.description',
    },
  },
  MODERN_HERO: {
    title: {
      id: 'app.containers.Achievements.modernHero.title',
    },
    description: {
      id: 'app.containers.Achievements.modernHero.description',
    },
  },
  KING_OF_THE_HILL: {
    title: {
      id: 'app.containers.Achievements.kingOfTheHill.title',
    },
    description: {
      id: 'app.containers.Achievements.kingOfTheHill.description',
    },
  },
});
