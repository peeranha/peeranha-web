import { FaqFull, mapDispatchToProps } from '../FaqFull';
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
      const mapp = new Map().set(EMAIL_FIELD);
      const form = 'form1';
      const reset = jest.fn();

      const formData = {
        email: EMAIL_FIELD,
      };

      const pageInfo = {
        url: window.location.href,
        name: `${messages.faqTitle.defaultMessage} | ${form}`,
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

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).sendEmailDispatch()).toBe(test);
    });
  });
});
