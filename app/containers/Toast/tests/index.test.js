import { Toast, mapDispatchToProps } from '../index';
import { BOTTOM_RIGHT } from '../constants';

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
    location: BOTTOM_RIGHT,
  };
});

describe('<Toast />', () => {
  describe('constructor', () => {
    it('test', () => {
      cmp.constructor(null);
      expect(cmp.location).toBe(BOTTOM_RIGHT);
    });
  });

  describe('removeToast', () => {
    it('test', () => {
      const removed = 'removed';
      cmp.props.removeToastDispatch.mockImplementation(() => removed);
      expect(cmp.removeToast(event)).toBe(removed);
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const obj = {};
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).removeToastDispatch(obj)).toBe(test);
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
