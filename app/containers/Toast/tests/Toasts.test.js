import Tosts from '../Toasts';

describe('Tosts', () => {
  const props = {
    removeToast: jest.fn(),
    toasts: [
      {
        text: 'Text',
        type: 'success',
        toastKey: 'toastKey',
      },
    ],
  };
  it('snapshot test', () => {
    expect(Tosts(props)).toMatchSnapshot();
  });
});
