import { SET_WALLET } from 'containers/SuiProvider/constants';
import { WalletContextState } from '@suiet/wallet-kit';

export function setWallet(wallet: WalletContextState) {
  return {
    type: SET_WALLET,
    wallet,
  };
}
