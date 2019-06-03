import { translationMessages } from 'i18n';

import { FaqFull } from '../FaqFull';
import { EMAIL_FIELD } from '../constants';
import messages from '../messages';

const cmp = new FaqFull();

cmp.props = {
  locale: 'en',
  sendEmailDispatch: jest.fn(),
};

describe('FaqFull', () => {
  describe('sendEmail', () => {
    it('test', () => {
      const mapp = new Map().set(EMAIL_FIELD, EMAIL_FIELD);
      const form = 'form1';
      const reset = jest.fn();

      const formData = {
        email: mapp.get(EMAIL_FIELD),
      };

      const pageInfo = {
        url: window.location.href,
        name: `${
          translationMessages[cmp.props.locale][messages.faqTitle.id]
        } | ${form}`,
      };

      cmp.sendEmail(mapp, () => {}, {
        form,
        reset,
      });

      expect(cmp.props.sendEmailDispatch).toHaveBeenCalledWith(
        formData,
        reset,
        pageInfo,
      );
    });
  });

  describe('snapshot test', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });
});
