import { defineMessages } from 'react-intl';
import { SCATTER_TIMEOUT_ERROR } from 'utils/constants';

export default defineMessages({
  accountDoesNotExist: {
    id: 'app.containers.ErrorPage.accountDoesNotExist',
    keywords: 'Account does not exist',
  },
  cannotTransferToSelf: {
    id: 'app.containers.ErrorPage.cannotTransferToSelf',
    keywords: 'Cannot transfer to self',
  },
  notEnoughCPU: {
    id: 'app.containers.ErrorPage.notEnoughCPU',
    keywords: '3080004',
  },
  checkScatterConnection: {
    id: 'app.containers.ErrorPage.checkScatterConnection',
    keywords: SCATTER_TIMEOUT_ERROR,
  },
});
