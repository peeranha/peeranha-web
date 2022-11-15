import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import * as routes from 'routes-config';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import H4 from 'components/H4';
import { ADefault } from 'components/A';

import questionsMessages from './messages';
const TheBestModalText = () => {
  return (
    <>
      <div>
        <FormattedMessage id={questionsMessages.areYouSureMarkedTheBest_1.id} />
      </div>
      <div>
        <FormattedMessage id={questionsMessages.areYouSureMarkedTheBest_2.id} />
      </div>
      <div>
        <FormattedMessage id={questionsMessages.areYouSureMarkedTheBest_3.id} />
      </div>
      <div>
        <FormattedMessage id={questionsMessages.areYouSureMarkedTheBest_4.id} />
        <ADefault className="pl-1" href={routes.faq()} target="_blank">
          <FormattedMessage
            id={questionsMessages.areYouSureMarkedTheBest_5.id}
          />
        </ADefault>
      </div>
    </>
  );
};

const AreYouSure = ({
  Button,
  submitAction,
  isGlobalAdmin,
  isMarkedTheBest,
}) => {
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
        onClick={(ev) => {
          open(true);
          changeEventData(ev.currentTarget);
        }}
      />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <H4 className="text-center pb-3">
            <FormattedMessage id={commonMessages.delete.id} />
          </H4>

          <div className="pb-4 text-center">
            {isMarkedTheBest && !isGlobalAdmin ? (
              <TheBestModalText />
            ) : (
              <FormattedMessage id={questionsMessages.areYouSure.id} />
            )}
          </div>
          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={closeModal}>
              <FormattedMessage id={commonMessages.no.id} />
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction({ currentTarget });
              }}
            >
              <FormattedMessage id={commonMessages.yes.id} />
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
