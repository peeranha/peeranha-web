import {
  sendEmail,
  sendEmailSuccess,
  sendEmailErr,
  sendMessage,
  sendMessageSuccess,
  sendMessageErr,
  showHeaderPopup,
  closeHeaderPopup,
} from '../actions';

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SHOW_HEADER_POPUP,
  CLOSE_HEADER_POPUP,
} from '../constants';

describe('actions', () => {
  describe('sendEmail Action', () => {
    it('SEND_EMAIL', () => {
      const val = 'val';

      const expected = {
        type: SEND_EMAIL,
        val,
      };

      expect(sendEmail(val)).toEqual(expected);
    });

    it('SEND_EMAIL_SUCCESS', () => {
      const expected = {
        type: SEND_EMAIL_SUCCESS,
      };

      expect(sendEmailSuccess()).toEqual(expected);
    });

    it('SEND_EMAIL_ERROR', () => {
      const sendEmailError = 'sendEmailError';
      const expected = {
        type: SEND_EMAIL_ERROR,
        sendEmailError,
      };

      expect(sendEmailErr(sendEmailError)).toEqual(expected);
    });
  });

  describe('sendMessage Action', () => {
    it('SEND_MESSAGE', () => {
      const val = 'val';

      const expected = {
        type: SEND_MESSAGE,
        val,
      };

      expect(sendMessage(val)).toEqual(expected);
    });

    it('SEND_MESSAGE_SUCCESS', () => {
      const expected = {
        type: SEND_MESSAGE_SUCCESS,
      };

      expect(sendMessageSuccess()).toEqual(expected);
    });

    it('SEND_MESSAGE_ERROR', () => {
      const sendMessageError = 'sendMessageError';
      const expected = {
        type: SEND_MESSAGE_ERROR,
        sendMessageError,
      };

      expect(sendMessageErr(sendMessageError)).toEqual(expected);
    });
  });

  describe('popup Action', () => {
    it('SHOW_HEADER_POPUP', () => {
      const popupPosition = 'popupPosition';

      const expected = {
        type: SHOW_HEADER_POPUP,
        popupPosition,
      };

      expect(showHeaderPopup(popupPosition)).toEqual(expected);
    });

    it('CLOSE_HEADER_POPUP', () => {
      const expected = {
        type: CLOSE_HEADER_POPUP,
      };

      expect(closeHeaderPopup()).toEqual(expected);
    });
  });
});
