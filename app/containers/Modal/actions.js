/*
 *
 * Modal actions
 *
 */

import {
  CHOOSE_MODAL_CONTENT,
  CLOSE_MODAL_WINDOW,
  MODAL_ID,
} from './constants';

export function chooseModalContent(content, modalSize = 'md') {
  window.$(`#${MODAL_ID}`).modal('show');
  return {
    type: CHOOSE_MODAL_CONTENT,
    content,
    modalSize,
  };
}

export function closeModalWindow() {
  window.$(`#${MODAL_ID}`).modal('hide');
  return {
    type: CLOSE_MODAL_WINDOW,
  };
}
