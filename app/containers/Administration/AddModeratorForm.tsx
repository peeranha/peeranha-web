import { Field, reduxForm } from 'redux-form/immutable';
// @ts-ignore
import { FormattedMessage } from 'react-intl';
// @ts-ignore
import { translationMessages } from 'i18n';
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
  ROLE_FIELD,
} from 'containers/Administration/constants';
import messages from 'containers/Administration/messages';

import { scrollToErrorField } from 'utils/animation';
import { TEXT_DARK } from 'style-constants';

type AddRoleFunction = (
  userAddress: string,
  role: number,
  communityId?: number,
) => void;

type AddRoleFormProps = {
  locale: string;
  single?: number;
  handleSubmit: (
    addRole: AddRoleFunction,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  addRole: AddRoleFunction;
  Button: React.FC<{ onClick: () => void }>;
  addRoleLoading: boolean;
};

const AddRoleForm: React.FC<AddRoleFormProps> = ({
  locale,
  single,
  handleSubmit,
  addRole,
  Button,
  addRoleLoading,
}): JSX.Element => {
  const [isOpened, open] = useState(false);

  const closeModal = () => {
    document.getElementsByTagName('body')[0].style.position = 'relative';
    // @ts-ignore
    modalRoot.removeChild(el);
    open(false);
  };

  const rolesName = [
    translationMessages[locale][messages.communityAdministrator.id],
    translationMessages[locale][messages.communityModerator.id],
  ];

  const addRoleMethod = (values: any) => {
    addRole(
      values.get(WALLET_ADDRESS_FIELD),
      Number(values.get(ROLE_FIELD)),
      single,
    );
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
            <FormattedMessage id={messages.addRole.id} />
          </h5>

          <form onSubmit={handleSubmit(addRoleMethod)}>
            <Field
              name={ROLE_FIELD}
              component="select"
              className="form-control"
              placeholder={translationMessages[locale][messages.chooseRole.id]}
            >
              <option value="" disabled>
                {translationMessages[locale][messages.chooseRole.id]}
              </option>
              {rolesName.map((roleName, index) => (
                <option key={roleName} value={index}>
                  {roleName}
                </option>
              ))}
            </Field>

            <Field
              name={WALLET_ADDRESS_FIELD}
              disabled={addRoleLoading}
              component={TextInputField}
              placeholder={
                translationMessages[locale][messages.walletAddress.id]
              }
              validate={[required, stringHasToBeEthereumAddress]}
              warn={[required, stringHasToBeEthereumAddress]}
            />

            <div className="df aic">
              <OutlinedButton className="mr12" onClick={closeModal}>
                <FormattedMessage id={messages.cancel.id} />
              </OutlinedButton>

              <ContainedButton
                disabled={addRoleLoading}
                type="submit"
                id={ADD_MODERATOR_BUTTON_BUTTON}
              >
                <FormattedMessage id={messages.confirm.id} />
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
})(AddRoleForm);
