import { fromJS } from 'immutable';

import {
  selectSendTokensDomain,
  selectShowModal,
  selectSendTokensProcessing,
  selectSendTokensError,
} from '../selectors';

describe('selectSendTokensDomain', () => {
  const showModal = true;
  const sendTokensProcessing = true;
  const sendTokensError = 'error';

  const globalState = fromJS({
    showModal,
    sendTokensProcessing,
    sendTokensError,
  });

  const mockedState = fromJS({
    sendTokens: globalState,
  });

  it('should select the global state', () => {
    expect(selectSendTokensDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectSendTokensProcessing', () => {
    const isSelectSendTokensProcessing = selectSendTokensProcessing();
    expect(isSelectSendTokensProcessing(mockedState)).toEqual(
      sendTokensProcessing,
    );
  });

  it('selectSendTokensError', () => {
    const isSelectSendTokensError = selectSendTokensError();
    expect(isSelectSendTokensError(mockedState)).toEqual(sendTokensError);
  });
});
