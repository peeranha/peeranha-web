import { appLocales } from 'i18n';
import messages from 'common-messages';

const languagesOptions = {
  all: {
    sortBy: '',
    message: messages.all,
  },
};

appLocales.forEach((x) => {
  languagesOptions[x] = {
    message: messages[x],
    sortBy: x,
  };
});

export default languagesOptions;
