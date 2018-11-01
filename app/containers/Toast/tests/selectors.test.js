import { fromJS } from 'immutable';
import { selectToastDomain, makeSelectToasts } from '../selectors';

describe('selectToastDomain', () => {
  const toasts = fromJS([]);

  const globalState = fromJS({
    toasts,
  });

  const mockedState = fromJS({
    signUp: globalState,
  });

  it('should select the global state', () => {
    expect(selectToastDomain(mockedState)).toEqual(globalState);
  });

  it('makeSelectToasts', () => {
    const isToasts = makeSelectToasts();
    expect(isToasts(mockedState)).toEqual(toasts);
  });
});
