import ErrorBoundryMessage from '../ErrorBoundryMessage';

describe('ErrorBoundryMessage', () => {
  const props = {
    error: 'error',
    errorInfo: {
      componentStack: 'componentStack',
    },
  };
  it('snapshot test', () => {
    expect(ErrorBoundryMessage(props)).toMatchSnapshot();
  });
});
