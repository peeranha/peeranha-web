import { Field, reduxForm, reset } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, useEffect, useState } from 'react';
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
import { Moderator } from 'containers/Administration/types';

import { scrollToErrorField } from 'utils/animation';
import { getCommunityRoles } from 'utils/properties';
import { TEXT_DARK } from 'style-constants';

import useTrigger from 'hooks/useTrigger';

type AddRoleFunction = (
  userAddress: string,
  role: number,
  communityId?: number,
  userHasRole?: boolean,
) => void;

type AddRoleFormProps = {
  locale: string;
  single?: number;
  handleSubmit: (
    addRole: AddRoleFunction,
  ) => FormEventHandler<HTMLFormElement> | undefined;
  addRole: AddRoleFunction;
  moderators: Array<Moderator>;
  Button: React.FC<{ onClick: () => void }>;
  addRoleLoading: boolean;
};

const clearFieldsAfterSubmit = (result: any, dispatch: any) =>
  dispatch(reset('answerForm'));

const AddRoleForm: React.FC<AddRoleFormProps> = ({
  locale,
  single,
  handleSubmit,
  addRole,
  moderators,
  Button,
  addRoleLoading,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);
  const [isValidate, setValidate] = useState(true);
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
    if (typeof role === 'undefined') {
      setValidate(false);
    } else {
      const walletAddress = values.get(WALLET_ADDRESS_FIELD);
      const communityRoles = getCommunityRoles(single);
      const isUserHasRole = moderators.find(
        (moderator) =>
          moderator.id === `${walletAddress}-${communityRoles[Number(role)]}`,
      );
      addRole(walletAddress, Number(role), single, Boolean(isUserHasRole));
      close();
    }
  };

  useEffect(() => {
    if (role) setValidate(true);
  }, [role]);

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
              ${!isValidate &&
              `border: 1px solid rgb(252, 102, 85);
              box-shadow: 0 0 0 3px rgb(252 102 85 / 40%);
              border-radius: 3px;`}
              margin-bottom: 5px;
              span {
                font-size: 14px;
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
              onSelect={(r) => {
                setValidate(true);
                setRole(r);
              }}
            />
          </div>
          {!isValidate && (
            <span
              css={{
                display: 'block',
                color: '#7b7b7b',
                fontStyle: 'italic',
                fontSize: '14px',
              }}
            >
              {t('administration.EmptyRole')}
            </span>
          )}

          <form onSubmit={handleSubmit(addRoleMethod)}>
            <Field
              css={css`
                padding-right: 14px !important;
              `}
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
  onSubmitSuccess: clearFieldsAfterSubmit,
  form: 'answerForm',
})(AddRoleForm);
