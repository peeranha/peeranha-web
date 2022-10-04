import messages from 'components/QuestionForm/messages';

export const labelConditional = (n: string) => {
  switch (n) {
    case '1':
      return messages.generalQuestionDescriptionLabel.id;
    case '0':
      return messages.expertQuestionDescriptionLabel.id;
    case '2':
      return messages.tutorialQuestionDescriptionLabel.id;
    case '3':
      return messages.faqDescriptionLabel.id;
  }
};

export const listConditional = (n: string) => {
  switch (n) {
    case '1':
      return messages.generalQuestionDescriptionList.id;
    case '0':
      return messages.expertQuestionDescriptionList.id;
    case '2':
      return messages.tutorialQuestionDescriptionList.id;
    case '3':
      return messages.faqDescriptionList.id;
  }
};
