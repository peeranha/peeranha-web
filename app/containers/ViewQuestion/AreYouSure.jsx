import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import H4 from 'components/H4';

const AreYouSure = ({ Button, submitAction }) => {
  const { t } = useTranslation();
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
          <H4 className="text-center pb-3">{t('common.delete')}</H4>

          <div className="pb-4">{t('post.areYouSure')}</div>

          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={closeModal}>
              {t('common.no')}
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction({ currentTarget });
              }}
            >
              {t('common.yes')}
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
