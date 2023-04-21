import { initialState } from 'containers/Search/reducer';
import { createSelector } from 'reselect';

const selectSuiProviderDomain = (state: any) => state.get('suiProvider', initialState).toJS();

export const selectSuiWallet = () =>
  createSelector(selectSuiProviderDomain, (substate) => substate.wallet);
