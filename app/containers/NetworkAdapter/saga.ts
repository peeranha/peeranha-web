/* eslint consistent-return: 0, no-shadow: 0 */
import { takeEvery, call, put, select } from 'redux-saga/effects';
// @ts-ignore
import { translationMessages } from 'i18n';

import EthereumService from 'containers/NetworkAdapter/ethereumService/ethereum';

import { initNetworkAdapterError, initNetworkAdapterSuccess } from './actions';
import {
  INIT_NETWORK_ADAPTER,
  INIT_NETWORK_ADAPTER_SUCCESS,
  NETWORKS,
} from './constants';

import {
  NetworkAdapter,
  NetworkProvider,
} from 'containers/NetworkAdapter/networkAdapter';
import { SuiService } from 'containers/NetworkAdapter/suiService/suiService';

export function* initNetworkAdapterWorker(network) {
  try {
    let service: NetworkProvider;
    switch (network) {
      case NETWORKS.ethereum: {
        service = new EthereumService();
        break;
      }
      case NETWORKS.sui: {
        service = new SuiService();
        break;
      }
    }

    const networkAdapter = new NetworkAdapter(service);

    yield put(initNetworkAdapterSuccess(networkAdapter));
  } catch (error) {
    yield put(initNetworkAdapterError(error));
  }
}
//
// export function* isAuthorized() {
//   const profileInfo = yield select(makeSelectProfileInfo());
//
//   if (!profileInfo) {
//     yield put(loginWithWallet());
//     throw new ApplicationError('Not authorized');
//   }
// }
//
// export function* isValid({ creator, buttonId, minRating = 0, communityId }) {
//   const locale = yield select(makeSelectLocale());
//   const profileInfo = yield select(makeSelectProfileInfo());
//   const selectedAccount = yield select(makeSelectAccount());
//   const permissions = yield select(selectPermissions());
//
//   const isGlobalAdmin = hasGlobalModeratorRole(permissions);
//
//   yield call(
//     isAvailableAction,
//     () =>
//       validate({
//         rating: getRatingByCommunity(profileInfo, communityId),
//         translations: translationMessages[locale],
//         actor: selectedAccount,
//         isGlobalAdmin,
//         creator,
//         buttonId,
//         minRating,
//       }),
//     {
//       communityID: communityId,
//     },
//   );
// }

export default function*() {
  yield takeEvery(INIT_NETWORK_ADAPTER, initNetworkAdapterWorker);
  // yield takeLatest(INIT_NETWORK_ADAPTER_SUCCESS, updateAccWorker);
}
