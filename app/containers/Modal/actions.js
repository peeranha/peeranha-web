/*
 *
 * Modal actions
 *
 */

import { CHOOSE_MODAL_CONTENT } from './constants';

export function chooseModalContent(content, modalSize = 'md') {
  return {
    type: CHOOSE_MODAL_CONTENT,
    content,
    modalSize,
  };
}
