import { Field, reduxForm } from 'redux-form/immutable';
// @ts-ignore
import { FormattedMessage } from 'react-intl';
// @ts-ignore
import { translationMessages } from 'i18n';
import React, { FormEventHandler, useState } from 'react';
import { css } from '@emotion/react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import TextInputField from 'components/FormFields/TextInputField';
import {
  required,
  stringHasToBeEthereumAddress,
} from 'components/FormFields/validate';
import Popup from 'common-components/Popup';
import Dropdown, { OptionValue } from 'common-components/Dropdown/Dropdown';
import {
  ADD_MODERATOR_BUTTON_BUTTON,
  WALLET_ADDRESS_FIELD,
} from 'containers/Administration/constants';
import messages from 'containers/Administration/messages';

import { scrollToErrorField } from 'utils/animation';
import { TEXT_DARK } from 'style-constants';

import useTrigger from 'hooks/useTrigger';

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
  const [isOpen, open, close] = useTrigger(false);
  const [role, setRole] = useState<OptionValue>();

  const rolesName = [
    translationMessages[locale][messages.communityAdministrator.id],
    translationMessages[locale][messages.communityModerator.id],
  ];

  const RoleNamesList = rolesName.map((roleName, index) => ({
    label: roleName,
    value: index,
  }));

  const addRoleMethod = (values: any) => {
    addRole(values.get(WALLET_ADDRESS_FIELD), Number(role), single);
    close();
  };

  return (
    <>
      <Button onClick={open} />

      {isOpen && (
        <Popup size="tiny" onClose={close}>
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
          <div
            css={css`
              span {
                font-size: 16px;
              }
              button {
                box-shadow: none !important;
              }
            `}
          >
            <Dropdown
              options={RoleNamesList}
              isMultiple={false}
              value={role}
              placeholder={translationMessages[locale][messages.chooseRole.id]}
              onSelect={setRole}
            />
          </div>

          <form onSubmit={handleSubmit(addRoleMethod)}>
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
              <OutlinedButton className="mr12" onClick={close}>
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
        </Popup>
      )}
    </>
  );
};

export default reduxForm<any, any>({
  onSubmitFail: (errors) => scrollToErrorField(errors),
  form: 'answerForm',
})(AddRoleForm);
