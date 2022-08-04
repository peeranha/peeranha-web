import { SCATTER_TIMEOUT_ERROR } from 'utils/constants';

export default {
  accountDoesNotExist: {
    id: 'errorPage.accountDoesNotExist',
    keywords: 'Account does not exist',
  },
  cannotTransferToSelf: {
    id: 'errorPage.cannotTransferToSelf',
    keywords: 'Cannot transfer to self',
  },
  notEnoughCPU: {
    id: 'errorPage.notEnoughCPU',
    keywords: '3080004',
  },
  checkScatterConnection: {
    id: 'errorPage.checkScatterConnection',
    keywords: SCATTER_TIMEOUT_ERROR,
  },
};
