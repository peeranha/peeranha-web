import ErrorBoundaryPage from '../ErrorBoundaryPage';

describe('ErrorBoundaryPage', () => {
  const props = {
    error: 'error',
    errorInfo: {
      componentStack: 'componentStack',
    },
  };
  it('snapshot test', () => {
    expect(ErrorBoundaryPage(props)).toMatchSnapshot();
  });
});
