/*
 * ErrorBoundary Messages
 *
 * This contains all the text for the ErrorBoundary component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.containers.ErrorBoundary.title',
    defaultMessage: 'Error',
  },
  description: {
    id: 'app.containers.ErrorBoundary.description',
    defaultMessage: 'Description of error boundary',
  },
  problemWithWebpage: {
    id: 'app.containers.ErrorBoundary.problemWithWebpage',
    defaultMessage: 'A problem occurred with this webpage',
  },
  details: {
    id: 'app.containers.ErrorBoundary.details',
    defaultMessage: 'Details',
  },
  reloadPage: {
    id: 'app.containers.ErrorBoundary.reloadPage',
    defaultMessage: 'Reload page',
  },
});
