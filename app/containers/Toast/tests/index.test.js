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

  describe('render', () => {
    describe('snapshot test', () => {
      it('toasts === MAP', () => {
        cmp.props.toasts = new Map();
        expect(cmp.render()).toMatchSnapshot();
      });

      it('toasts === Map.set', () => {
        const toasts = new Map();
        cmp.props.toasts = toasts.set('obj', {});
        expect(cmp.render()).toMatchSnapshot();
      });
    });
  });
});
