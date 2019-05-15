import { appLocales } from 'i18n';
import messages from 'common-messages';

const languagesOption = {
  all: {
    sortBy: '',
    message: messages.all,
  },
};

appLocales.forEach(x => {
  languagesOption[x] = {
    message: messages[x],
    sortBy: x,
  };
});

export default languagesOption;
