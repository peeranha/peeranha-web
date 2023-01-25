export const labelConditional = (n: string) => {
  switch (n) {
    case '1':
      return 'common.generalQuestionDescriptionLabel';
    case '0':
      return 'common.expertQuestionDescriptionLabel';
    case '2':
      return 'common.tutorialQuestionDescriptionLabel';
    case '3':
      return 'post.faqDescriptionLabel';
    default:
      return 'common.generalQuestionDescriptionLabel';
  }
};

export const listConditional = (n: string) => {
  switch (n) {
    case '1':
      return 'common.generalQuestionDescriptionList';
    case '0':
      return 'common.expertQuestionDescriptionList';
    case '2':
      return 'common.tutorialQuestionDescriptionList';
    case '3':
      return 'post.faqDescriptionList';
    default:
      return 'common.generalQuestionDescriptionList';
  }
};
