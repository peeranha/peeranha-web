/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */

import { defineMessages } from 'react-intl';

const CURRENT_YEAR = new Date().getFullYear();

export default defineMessages({
  copyrightSymbol: {
    id: 'app.components.Footer.copyrightSymbol',
    defaultMessage: '© ',
  },
  currentYear: {
    id: 'app.components.Footer.currentYear',
    defaultMessage: `${CURRENT_YEAR} `,
  },
  header: {
    id: 'app.components.Footer.header',
    defaultMessage: `Copyright: Peerania`,
  },
});
