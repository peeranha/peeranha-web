import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, useState } from 'react';
import { css } from '@emotion/react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import TextInputField from 'components/FormFields/TextInputField';
import {
  required,
  stringHasToBeEthereumAddress,
} from 'components/FormFields/validate';
import Dropdown, { OptionValue } from 'components/common/Dropdown/Dropdown';
import Popup from 'components/common/Popup';
import {
  ADD_MODERATOR_BUTTON_BUTTON,
  WALLET_ADDRESS_FIELD,
} from 'containers/Administration/constants';

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
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);
  const [role, setRole] = useState<OptionValue>();

  const rolesName = [
    t('administration.communityAdministrator'),
    t('administration.communityModerator'),
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
            {t('administration.addRole')}
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
              placeholder={t('administration.chooseRole')}
              onSelect={setRole}
            />
          </div>

          <form onSubmit={handleSubmit(addRoleMethod)}>
            <Field
              name={WALLET_ADDRESS_FIELD}
              disabled={addRoleLoading}
              component={TextInputField}
              placeholder={t('common.walletAddress')}
              validate={[required, stringHasToBeEthereumAddress]}
              warn={[required, stringHasToBeEthereumAddress]}
            />

            <div className="df aic">
              <OutlinedButton className="mr12" onClick={close}>
                {t('administration.cancel')}
              </OutlinedButton>

              <ContainedButton
                disabled={addRoleLoading}
                type="submit"
                id={ADD_MODERATOR_BUTTON_BUTTON}
              >
                {t('administration.confirm')}
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
