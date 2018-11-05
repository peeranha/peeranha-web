import renderTextInput from '../renderTextInput';
import messages from '../messages';

const sendProps = {
  input: {},
  meta: {
    touched: false,
    error: false,
    warning: false,
  },
  disabled: false,
  translations: {
    [messages.titleLabel.id]: 'content',
  },
};

describe('renderTextInput', () => {
  describe('snapshot test', () => {
    it('meta: {}', () => {
      expect(renderTextInput(sendProps)).toMatchSnapshot();
    });

    it('touched = true', () => {
      sendProps.meta.touched = true;
      expect(renderTextInput(sendProps)).toMatchSnapshot();
    });

    it('error = true', () => {
      sendProps.meta.error = true;
      expect(renderTextInput(sendProps)).toMatchSnapshot();
    });

    it('warning = true', () => {
      sendProps.meta.warning = true;
      expect(renderTextInput(sendProps)).toMatchSnapshot();
    });

    it('touched = false', () => {
      sendProps.meta.touched = false;
      expect(renderTextInput(sendProps)).toMatchSnapshot();
    });
  });
});
