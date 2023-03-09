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

import useTrigger from 'hooks/useTrigger';
import { styles } from './Administration.styled';

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

  const roleNamesList = [
    t('administration.communityAdministrator'),
    t('administration.communityModerator'),
  ].map((roleName, index) => ({
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
          <h5 css={styles.popupTitle} className="tc fz22 semi-bold">
            {t('administration.addRole')}
          </h5>
          <div
            css={{
              ...styles.dropdown,
              ...(!isValidate && styles.validationError),
            }}
          >
            <Dropdown
              options={roleNamesList}
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
            <span className="db fz14" css={styles.popupText}>
              {t('administration.EmptyRole')}
            </span>
          )}

          <form onSubmit={handleSubmit(addRoleMethod)}>
            <Field
              css={styles.popupField}
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
