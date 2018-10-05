import { fromJS } from 'immutable';
import {
  selectEosioProviderDomain,
  makeSelectInitializing,
  makeSelectInitialized,
  makeSelectEosioInstance,
  makeSelectScatterInstalled,
  makeSelectScatterInstance,
} from '../selectors';

describe('selectEosioProviderDomain', () => {
  const eosioInstance = { name: 'eosioInstance' };
  const scatterInstance = { name: 'scatterInstance' };
  const error = { message: 'errorMessage' };

  const eosioProviderState = fromJS({
    initializing: true,
    initialized: true,
    scatterInstalled: true,
    scatterInstance,
    eosioInstance,
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

  it('should select initialized value', () => {
    const initializedSelector = makeSelectInitialized();
    expect(initializedSelector(mockedState)).toEqual(true);
  });

  it('should select EOSIO instance value', () => {
    const eosioInstanceSelector = makeSelectEosioInstance();
    expect(eosioInstanceSelector(mockedState)).toEqual(fromJS(eosioInstance));
  });

  it('should select scatter installed value', () => {
    const scatterInstalledSelector = makeSelectScatterInstalled();
    expect(scatterInstalledSelector(mockedState)).toEqual(true);
  });

  it('should select scatter instance value', () => {
    const scatterInstanceSelector = makeSelectScatterInstance();
    expect(scatterInstanceSelector(mockedState)).toEqual(
      fromJS(scatterInstance),
    );
  });
});
