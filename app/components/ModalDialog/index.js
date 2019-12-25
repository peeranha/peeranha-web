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
          document.getElementsByTagName('body')[0].style.position = 'fixed';
          modalRoot.appendChild(this.el);
        } else if (!nextProps.show && modalRoot.childElementCount !== 0) {
          document.getElementsByTagName('body')[0].style.position = 'relative';
          modalRoot.removeChild(this.el);
        }
      } catch (err) {}
    }
  }

  render() {
    const { closeModal, children, show } = this.props;

    if (!show) return null;

    return ReactDOM.createPortal(
      <React.Fragment>
        <ModalStyled>
          <div className="d-flex justify-content-end">
            <Icon
              onClick={closeModal}
              icon={closeIcon}
              width="16"
              color={TEXT_SECONDARY_LIGHT}
            />
          </div>
          <div className="modal-children">{children}</div>
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
