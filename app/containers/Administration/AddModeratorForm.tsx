import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, useState } from 'react';
import { css } from '@emotion/react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import ModalDialog, { el, modalRoot } from 'components/ModalDialog';
import TextInputField from 'components/FormFields/TextInputField';
import {
  required,
  stringHasToBeEthereumAddress,
} from 'components/FormFields/validate';

import {
  ADD_MODERATOR_BUTTON_BUTTON,
  WALLET_ADDRESS_FIELD,
} from 'containers/Administration/constants';

import { scrollToErrorField } from 'utils/animation';
import { TEXT_DARK } from 'style-constants';

type AddModeratorFunction = (userAddress: string, communityId?: number) => void;

type AddModeratorFormProps = {
  locale: string;
  single?: number;
  handleSubmit: (
    addModerator: AddModeratorFunction,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  addModerator: AddModeratorFunction;
  Button: React.FC<{ onClick: () => void }>;
  addModeratorLoading: boolean;
};

const AddModeratorForm: React.FC<AddModeratorFormProps> = ({
  single,
  handleSubmit,
  addModerator,
  Button,
  addModeratorLoading,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
    modalRoot.removeChild(el);
    open(false);
  };

  const addModeratorMethod = (values: any) => {
    addModerator(values.get(WALLET_ADDRESS_FIELD), single);
    closeModal();
  };

  return (
    <>
      <Button
        onClick={() => {
          open(true);
        }}
      />

      {isOpened && (
        <ModalDialog closeModal={closeModal} show={isOpened}>
          <h5
            css={css`
              color: ${TEXT_DARK};
              font-weight: 600;
              font-size: 22px;
              line-height: 28px;
            `}
            className="tc"
          >
            {t('administration.addModerator')}
          </h5>

          <form onSubmit={handleSubmit(addModeratorMethod)}>
            <Field
              name={WALLET_ADDRESS_FIELD}
              disabled={addModeratorLoading}
              component={TextInputField}
              placeholder={t('common.walletAddress')}
              validate={[required, stringHasToBeEthereumAddress]}
              warn={[required, stringHasToBeEthereumAddress]}
            />

            <div className="df aic">
              <OutlinedButton className="mr12" onClick={closeModal}>
                {t('administration.cancel')}
              </OutlinedButton>

              <ContainedButton
                disabled={addModeratorLoading}
                type="submit"
                id={ADD_MODERATOR_BUTTON_BUTTON}
              >
                {t('administration.confirm')}
              </ContainedButton>
            </div>
          </form>
        </ModalDialog>
      )}
    </>
  );
};

export default reduxForm<any, any>({
  onSubmitFail: (errors) => scrollToErrorField(errors),
  form: 'answerForm',
})(AddModeratorForm);
