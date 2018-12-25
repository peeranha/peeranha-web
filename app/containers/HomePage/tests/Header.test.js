import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import { Header, mapDispatchToProps } from '../Header';

jest.mock('createdHistory', () => ({
  push: jest.fn(),
}));

const cmp = new Header();
cmp.props = {
  sendEmailLoading: false,
  sendEmail: () => {},
  showHeaderPopupDispatch: jest.fn(),
  closeHeaderPopupDispatch: jest.fn(),
  showPopup: true,
  popupPosition: {},
};

const ev = {
  target: null,
  currentTarget: {
    dataset: {
      hash: null,
    },
  },
};

describe('Header', () => {
  describe('changeLocation', () => {
    it('test', () => {
      cmp.changeLocation(ev);
      expect(createdHistory.push).toHaveBeenCalledWith(routes.home());
    });
  });

  describe('showModalPlatformDeveloping', () => {
    it('test', () => {
      const left = 1000;

      window.$ = () => ({
        offset: () => ({
          left,
        }),
      });

      cmp.showModalPlatformDeveloping(ev);
      expect(cmp.props.showHeaderPopupDispatch).toHaveBeenCalledWith({
        top: 120,
        left: left * 0.85,
      });
    });
  });

  describe('closeModalPlatformDeveloping', () => {
    it('test', () => {
      cmp.closeModalPlatformDeveloping();
      expect(cmp.props.closeHeaderPopupDispatch).toHaveBeenCalled();
    });
  });

  describe('snapshot test', () => {
    it('test', () => {
      expect(cmp.render()).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('mapDispatchToProps test', () => {
      const test = 'test';
      const dispatch = () => test;

      expect(typeof mapDispatchToProps(dispatch) === 'object').toBe(true);
      expect(mapDispatchToProps(dispatch).dispatch).toBe(dispatch);
      expect(mapDispatchToProps(dispatch).showHeaderPopupDispatch()).toBe(test);
      expect(mapDispatchToProps(dispatch).closeHeaderPopupDispatch()).toBe(
        test,
      );
    });
  });
});
