import { addToast, removeToast } from '../actions';
import { ADD_TOAST, REMOVE_TOAST } from '../constants';

describe('Toasts actions', () => {
  describe('addToast', () => {
    it('ADD_TOAST type', () => {
      const addedToast = {
        type: 'info',
        text: 'text',
      };
      const expected = {
        type: ADD_TOAST,
        addedToast,
      };
      expect(addToast(addedToast)).toEqual(expected);
    });
  });

  describe('removeToast', () => {
    it('REMOVE_TOAST type', () => {
      const toastKey = 'toastKey';
      const expected = {
        type: REMOVE_TOAST,
        toastKey,
      };
      expect(removeToast(toastKey)).toEqual(expected);
    });
  });
});
