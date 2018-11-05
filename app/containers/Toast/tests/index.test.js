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
    toasts: [],
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
      it('toasts === []', () => {
        cmp.props.toasts = [];
        expect(cmp.render()).toMatchSnapshot();
      });

      it('toasts === [{}]', () => {
        cmp.props.toasts = [{}];
        expect(cmp.render()).toMatchSnapshot();
      });
    });
  });
});
