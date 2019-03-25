import { fromJS } from 'immutable';
import {
  selectHomepageDomain,
  selectSendEmailLoading,
  selectSendEmailError,
  selectSendMessageLoading,
  selectSendMessageError,
  selectShowPopup,
  selectHeaderPopupPosition,
} from '../selectors';

describe('selectHomepageDomain', () => {
  const sendEmailLoading = true;
  const sendEmailError = 'sendEmailError';
  const sendMessageLoading = true;
  const sendMessageError = 'sendMessageError';
  const showPopup = true;
  const popupPosition = 'popupPosition';

  const globalState = fromJS({
    sendEmailLoading,
    sendEmailError,
    sendMessageLoading,
    sendMessageError,
    showPopup,
    popupPosition,
  });

  const mockedState = fromJS({
    homepage: globalState,
  });

  it('should select the global state', () => {
    expect(selectHomepageDomain(mockedState)).toEqual(globalState);
  });

  it('selectSendEmailLoading', () => {
    const isSelectSendEmailLoading = selectSendEmailLoading();
    expect(isSelectSendEmailLoading(mockedState)).toEqual(sendEmailLoading);
  });

  it('selectSendEmailError', () => {
    const isSelectSendEmailError = selectSendEmailError();
    expect(isSelectSendEmailError(mockedState)).toEqual(sendEmailError);
  });

  it('selectSendMessageLoading', () => {
    const isSelectSendMessageLoading = selectSendMessageLoading();
    expect(isSelectSendMessageLoading(mockedState)).toEqual(sendMessageLoading);
  });

  it('selectSendMessageError', () => {
    const isSelectSendMessageError = selectSendMessageError();
    expect(isSelectSendMessageError(mockedState)).toEqual(sendMessageError);
  });

  it('selectShowPopup', () => {
    const isSelectShowPopup = selectShowPopup();
    expect(isSelectShowPopup(mockedState)).toEqual(showPopup);
  });

  it('selectHeaderPopupPosition', () => {
    const isSelectHeaderPopupPosition = selectHeaderPopupPosition();
    expect(isSelectHeaderPopupPosition(mockedState)).toEqual(popupPosition);
  });
});
