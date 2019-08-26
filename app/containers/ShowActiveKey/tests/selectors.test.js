import { fromJS } from 'immutable';

import {
  selectShowActiveKeyDomain,
  selectShowModal,
  selectShowActiveKeyProcessing,
  selectShowActiveKeyError,
  selectActiveKey,
} from '../selectors';

describe('selectShowActiveKeyDomain', () => {
  const showModal = true;
  const showActiveKeyProcessing = true;
  const showActiveKeyError = 'error';
  const activeKey = 'activeKey';

  const globalState = fromJS({
    showModal,
    showActiveKeyProcessing,
    showActiveKeyError,
    activeKey,
  });

  const mockedState = fromJS({
    showActiveKey: globalState,
  });

  it('should select the global state', () => {
    expect(selectShowActiveKeyDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectShowModal', () => {
    const isSelectShowModal = selectShowModal();
    expect(isSelectShowModal(mockedState)).toEqual(showModal);
  });

  it('selectShowActiveKeyProcessing', () => {
    const isSelectShowActiveKeyProcessing = selectShowActiveKeyProcessing();
    expect(isSelectShowActiveKeyProcessing(mockedState)).toEqual(
      showActiveKeyProcessing,
    );
  });

  it('selectShowActiveKeyError', () => {
    const isSelectShowActiveKeyError = selectShowActiveKeyError();
    expect(isSelectShowActiveKeyError(mockedState)).toEqual(showActiveKeyError);
  });

  it('selectActiveKey', () => {
    const isSelectActiveKey = selectActiveKey();
    expect(isSelectActiveKey(mockedState)).toEqual(activeKey);
  });
});
