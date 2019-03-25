import { fromJS } from 'immutable';
import {
  selectEosioProviderDomain,
  makeSelectInitializing,
  makeSelectEos,
  makeSelectError,
  selectEos,
} from '../selectors';

describe('selectEosioProviderDomain', () => {
  const eos = { initialized: true };
  const error = { message: 'errorMessage' };

  const eosioProviderState = fromJS({
    initializing: true,
    eos,
    error,
  });
  const mockedState = fromJS({
    eosioProvider: eosioProviderState,
  });
  it('should select the global state', () => {
    expect(selectEosioProviderDomain(mockedState)).toEqual(eosioProviderState);
  });

  it('should select initializing value', () => {
    const initializingSelector = makeSelectInitializing();
    expect(initializingSelector(mockedState)).toEqual(true);
  });

  it('should select eos (makeSelectEos)', () => {
    const eosSelector = makeSelectEos();
    expect(eosSelector(mockedState)).toEqual(fromJS(eos));
  });

  it('should select eos (selectEos)', () => {
    expect(selectEos(mockedState)).toEqual(fromJS(eos));
  });

  it('should select error', () => {
    const errorSelector = makeSelectError();
    expect(errorSelector(mockedState)).toEqual(fromJS(error));
  });
});
