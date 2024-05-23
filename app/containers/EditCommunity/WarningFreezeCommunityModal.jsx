import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { graphCommunityColors } from 'utils/communityManagement';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import H4 from 'components/H4';

const graphCommunity = graphCommunityColors();

const WarningFreezeCommunityModal = ({ isFrozen, Button, submitAction }) => {
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    document.body.style.top = `-${window.scrollY}px`;
    setIsOpened(true);
  };

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

    setIsOpened(false);
  };

  return (
    <>
      <Button onClick={openModal} />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <H4 className="text-center pb-3">
            {t(`common.editCommunityDesc.${isFrozen ? 'unfreezeCommunity' : 'freezeCommunity'}`)}
          </H4>

          <div className="pb-4 text-center" css={graphCommunity && { color: '#E1E1E4' }}>
            {t(
              `createCommunity.${
                isFrozen ? 'areYouSureUnfreezeCommunity' : 'areYouSureFreezeCommunity'
              }`,
            )}
          </div>

          <div className="d-flex align-items-center pb-3">
            <OutlinedButton className="mr-3" onClick={closeModal}>
              {t('common.no')}
            </OutlinedButton>

            <ContainedButton
              onClick={() => {
                closeModal();
                submitAction();
              }}
            >
              {t('common.yes')}
            </ContainedButton>
          </div>
        </ModalDialog>
      )}
    </>
  );
};

WarningFreezeCommunityModal.propTypes = {
  isFrozen: PropTypes.bool,
  Button: PropTypes.any,
  submitAction: PropTypes.func,
};

export default React.memo(WarningFreezeCommunityModal);
