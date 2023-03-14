import { Field, reduxForm, reset } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, useState } from 'react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import TextInputField from 'components/FormFields/TextInputField';
import {
  required,
  stringHasToBeEthereumAddress,
} from 'components/FormFields/validate';
import Popup from 'components/common/Popup';
import {
  ADD_MODERATOR_BUTTON_BUTTON,
  WALLET_ADDRESS_FIELD,
} from 'containers/Administration/constants';
import { Moderator } from 'containers/Administration/types';

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
const AddRoleForm: React.FC<AddRoleFormProps> = ({
  single,
  handleSubmit,
  addRole,
  moderators,
  Button,
  dispatch,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);

  const [administratorRole, setAdministratorRole] =
    React.useState<boolean>(false);
  const [moderatorRole, setModeratorRole] = useState<boolean>(false);
  const [roleValidation, setRoleValidation] = useState<boolean | string>(false);

  const setAdministratorRoleHandler = (
    e: React.FormEvent<HTMLInputElement>,
  ) => {
    setRoleValidation(false);
    setModeratorRole(!e.currentTarget.value);
    setAdministratorRole(e.currentTarget.value);
  };
  const setModeratorRoleHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setRoleValidation(false);
    setAdministratorRole(!e.currentTarget.value);
    setModeratorRole(e.currentTarget.value);
  };

  const isEmptyRoleHandler = () => {
    if (!administratorRole && !moderatorRole)
      setRoleValidation(t('administration.EmptyRole'));
  };

  const addRoleMethod = (values: any) => {
    if (!administratorRole && !moderatorRole) {
      setRoleValidation(t('administration.EmptyRole'));
    } else {
      const role = administratorRole ? 0 : 1;
      const walletAddress = values.get(WALLET_ADDRESS_FIELD);

      const communityRoles = getCommunityRoles(single);

      const isUserHasRole = moderators.find(
        (moderator) =>
          moderator.id === `${walletAddress}-${communityRoles[role]}`,
      );

      if (isUserHasRole) {
        setRoleValidation(
          t(
            `administration.${
              role === 0
                ? 'alreadyHasAdministratorRole'
                : 'alreadyHasModeratorRole'
            }`,
          ),
        );
      } else {
        addRole(walletAddress, role, single, Boolean(isUserHasRole));
        dispatch(reset('answerForm'));
        close();
      }
    }
  };

  return (
    <>
      <Button onClick={open} />

      {isOpen && (
        <Popup size="tiny" onClose={close}>
          <h5 className="tc fz24 semi-bold mb24" css={styles.popupTitle}>
            {t('administration.addRole')}
          </h5>
          <span className="dib fz16 semi-bold mb16" css={styles.popupSpan}>
            {t('administration.chooseRole')}
          </span>

          <div className="mb24">
            <div className="df">
              <div className="dif aic" css={styles.firstCheckbox}>
                <div
                  css={{
                    ...styles.popupCheckbox,
                    ...(roleValidation === t('administration.EmptyRole') &&
                      styles.checkboxError),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={administratorRole}
                    onChange={setAdministratorRoleHandler}
                  />
                </div>
                <span css={styles.popupCheckboxLabel}>
                  {t('administration.communityAdministrator')}
                </span>
              </div>
              <div className="dif aic">
                <div
                  css={{
                    ...styles.popupCheckbox,
                    ...(roleValidation === t('administration.EmptyRole') &&
                      styles.checkboxError),
                  }}
                >
                  <input
                    type="checkbox"
                    checked={moderatorRole}
                    onChange={setModeratorRoleHandler}
                  />
                </div>
                <span css={styles.popupCheckboxLabel}>
                  {t('administration.communityModerator')}
                </span>
              </div>
            </div>

            {roleValidation && (
              <span className="db fz14" css={styles.validationText}>
                {roleValidation}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit(addRoleMethod)}>
            <Field
              name={WALLET_ADDRESS_FIELD}
              component={TextInputField}
              placeholder={t('common.walletAddress')}
              validate={[required, stringHasToBeEthereumAddress]}
              warn={[required, stringHasToBeEthereumAddress]}
              warningStyle={styles.validationField}
              onFocus={isEmptyRoleHandler}
            />

            <div className="df aic mt32">
              <OutlinedButton className="mr16" onClick={close}>
                {t('administration.cancel')}
              </OutlinedButton>

              <ContainedButton
                type="submit"
                id={ADD_MODERATOR_BUTTON_BUTTON}
                onClick={isEmptyRoleHandler}
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
  form: 'answerForm',
})(AddRoleForm);
