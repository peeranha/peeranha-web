import { ErrorBoundaryMessage } from '../ErrorBoundaryMessage';

describe('ErrorBoundaryMessage', () => {
  const props = {
    error: 'error',
    errorInfo: {
      componentStack: 'componentStack',
    },
  };

  it('snapshot test', () => {
    expect(ErrorBoundaryMessage(props)).toMatchSnapshot();
  });
});
