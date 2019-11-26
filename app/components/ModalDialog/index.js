/* eslint no-empty: 0, no-unused-expressions: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';
import closeIcon from 'images/close.svg?external';
import Icon from 'components/Icon';

import ModalStyled from './ModalStyled';
import Blanket from './Blanket';

const modalRoot = document.getElementById('modal');

export class ModalDialog extends React.PureComponent {
  componentWillMount() {
    this.el = document.createElement('div');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      try {
        if (nextProps.show && modalRoot.childElementCount === 0) {
          modalRoot.appendChild(this.el);
        } else if (!nextProps.show && modalRoot.childElementCount !== 0) {
          modalRoot.removeChild(this.el);
        }
      } catch (err) {}
    }
  }

  render() {
    const { closeModal, children } = this.props;

    return ReactDOM.createPortal(
      <React.Fragment>
        <ModalStyled>
          <div>{children}</div>
          <Icon
            onClick={closeModal}
            icon={closeIcon}
            width="16"
            color={TEXT_SECONDARY_LIGHT}
          />
        </ModalStyled>
        <Blanket onClick={closeModal} />
      </React.Fragment>,
      this.el,
    );
  }
}

ModalDialog.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.any,
};

export default React.memo(ModalDialog);
