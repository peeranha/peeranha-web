import React from 'react';
import { ModalDialog } from '../index';

const cmp = new ModalDialog();
const children = <div>Children</div>;

/* eslint no-underscore-dangle: 1 */
cmp._reactInternalFiber = {
  return: {
    stateNode: {},
  },
};

React.Children.only = () => children;

describe('<ModalDialog />', () => {
  it('componentDidUpdate', () => {
    cmp.props = {
      show: true,
      closeModal: () => true,
    };

    window.$ = () => ({
      modal: show => show,
      on: closeModal => closeModal,
    });

    expect(cmp.componentDidUpdate()).toEqual(true);
  });

  it('render test', () => {
    expect(cmp.render()).toMatchSnapshot();
  });

  it('modalShow test', () => {
    expect(cmp.modalShow(true)).toBe('show');
    expect(cmp.modalShow(false)).toBe('hide');
  });
});
