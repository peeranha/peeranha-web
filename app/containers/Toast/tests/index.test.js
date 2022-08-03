import { Toast } from '../index';
import { TOP_RIGHT } from '../constants';

const cmp = new Toast();
const event = {
  target: {
    dataset: {
      key: 'key',
    },
  },
};

beforeEach(() => {
  cmp.props = {
    toasts: new Map(),
    removeToastDispatch: jest.fn(),
    location: TOP_RIGHT,
  };
});

describe('<Toast />', () => {
  describe('constructor', () => {
    it('test', () => {
      cmp.constructor(null);
      expect(cmp.location).toBe(TOP_RIGHT);
    });
  });

  describe('removeToast', () => {
    it('test', () => {
      const removed = 'removed';
      cmp.props.removeToastDispatch.mockImplementation(() => removed);
      expect(cmp.removeToast(event)).toBe(removed);
    });
  });
});
