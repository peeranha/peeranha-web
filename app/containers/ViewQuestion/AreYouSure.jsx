import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import H4 from 'components/H4';

import questionsMessages from './messages';

const AreYouSure = ({ Button, submitAction }) => {
  const [currentTarget, changeEventData] = useState(null);
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
    modalRoot.removeChild(el);

    open(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={ev => {
          open(true);
          changeEventData(ev.currentTarget);
        }}
      />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <H4 className="text-center pb-3">
            <FormattedMessage {...commonMessages.delete} />
          </H4>

          <div className="pb-4">
            <FormattedMessage {...questionsMessages.areYouSure} />
          </div>

          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={closeModal}>
              <FormattedMessage {...commonMessages.no} />
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction({ currentTarget });
              }}
            >
              <FormattedMessage {...commonMessages.yes} />
            </ContainedButton>
          </div>
        </ModalDialog>
      )}
    </React.Fragment>
  );
};

AreYouSure.propTypes = {
  Button: PropTypes.any,
  submitAction: PropTypes.func,
};

export default React.memo(AreYouSure);
