import { fromJS } from 'immutable';
import {
  selectLoginDomain,
  makeSelectContent,
  makeSelectShowModal,
} from '../selectors';

describe('selectLoginDomain', () => {
  const content = 'content';
  const showModal = 'showModal';

  const globalState = fromJS({
    content,
    showModal,
  });

  const mockedState = fromJS({
    login: globalState,
  });

  it('should select the global state', () => {
    expect(selectLoginDomain(mockedState)).toEqual(globalState);
  });

  it('makeSelectContent', () => {
    const isContent = makeSelectContent();
    expect(isContent(mockedState)).toEqual(content);
  });

  it('makeSelectShowModal', () => {
    const isShowModal = makeSelectShowModal();
    expect(isShowModal(mockedState)).toEqual(showModal);
  });
});
