import { fromJS } from 'immutable';

import {
  selectHomepageDomain,
  selectSendMessageLoading,
  selectSendMessageError,
} from '../selectors';

describe('selectHomepageDomain', () => {
  const sendMessageLoading = true;
  const sendMessageError = 'sendMessageError';

  const globalState = fromJS({
    sendMessageLoading,
    sendMessageError,
  });

  const mockedState = fromJS({
    homepage: globalState,
  });

  it('should select the global state', () => {
    expect(selectHomepageDomain(mockedState)).toEqual(globalState);
  });

  it('selectSendMessageLoading', () => {
    const isSelectSendMessageLoading = selectSendMessageLoading();
    expect(isSelectSendMessageLoading(mockedState)).toEqual(sendMessageLoading);
  });

  it('selectSendMessageError', () => {
    const isSelectSendMessageError = selectSendMessageError();
    expect(isSelectSendMessageError(mockedState)).toEqual(sendMessageError);
  });
});
