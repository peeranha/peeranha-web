import { fromJS } from 'immutable';

import {
  selectWalletDomain,
  selectWeekStat,
  selectGetWeekStatProcessing,
  selectGetWeekStatError,
} from '../selectors';

describe('selectWalletDomain', () => {
  const weekStat = true;
  const getWeekStatProcessing = true;
  const getWeekStatError = 'error';

  const globalState = fromJS({
    weekStat,
    getWeekStatProcessing,
    getWeekStatError,
  });

  const mockedState = fromJS({
    wallet: globalState,
  });

  it('should select the global state', () => {
    expect(selectWalletDomain(mockedState)).toEqual(globalState.toJS());
  });

  it('selectWeekStat', () => {
    const isSelectWeekStat = selectWeekStat();
    expect(isSelectWeekStat(mockedState)).toEqual(weekStat);
  });

  it('selectGetWeekStatProcessing', () => {
    const isSelectGetWeekStatProcessing = selectGetWeekStatProcessing();
    expect(isSelectGetWeekStatProcessing(mockedState)).toEqual(
      getWeekStatProcessing,
    );
  });

  it('selectGetWeekStatError', () => {
    const isSelectGetWeekStatError = selectGetWeekStatError();
    expect(isSelectGetWeekStatError(mockedState)).toEqual(getWeekStatError);
  });
});
