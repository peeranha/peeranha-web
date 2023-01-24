import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import H4 from 'components/H4';

const TheBestModalText = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>{t('post.areYouSureMarkedTheBest_1')}</div>
      <div>{t('post.areYouSureMarkedTheBest_2')}</div>
      <div>{t('post.areYouSureMarkedTheBest_3')}</div>
    </>
  );
};

const AreYouSure = ({
  Button,
  submitAction,
  isGlobalAdmin,
  isMarkedTheBest,
}) => {
  const { t } = useTranslation();
  const [currentTarget, changeEventData] = useState(null);
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
    modalRoot.removeChild(el);

    const scrollY = document.body.style.top;
    document.body.style.top = '';
    window.scrollTo({
      left: 0,
      top: parseInt(scrollY || '0', 10) * -1,
      behavior: 'instant',
    });

    open(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={(ev) => {
          document.body.style.top = `-${window.scrollY}px`;
          open(true);
          changeEventData(ev.currentTarget);
        }}
      />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <H4 className="text-center pb-3">{t('common.delete')}</H4>

          <div className="pb-4 text-center">
            {isMarkedTheBest && !isGlobalAdmin ? (
              <TheBestModalText />
            ) : (
              t('post.areYouSure')
            )}
          </div>

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
