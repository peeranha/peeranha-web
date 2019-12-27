import { sendMessage, sendMessageSuccess, sendMessageErr } from '../actions';

import {
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from '../constants';

describe('actions', () => {
  describe('sendMessage Action', () => {
    it('SEND_MESSAGE', () => {
      const val1 = 'val1';
      const val12 = 'val12';

      const expected = {
        type: SEND_MESSAGE,
        val: [val1, val12],
      };

      expect(sendMessage(val1, val12)).toEqual(expected);
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
});
