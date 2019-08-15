import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectWalletDomain = state => state.get('wallet', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Wallet
 */

const makeSelectWallet = () =>
  createSelector(selectWalletDomain, substate => substate.toJS());

export default makeSelectWallet;
export { selectWalletDomain };
