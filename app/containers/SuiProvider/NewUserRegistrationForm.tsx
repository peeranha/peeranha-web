import { Field, reduxForm, reset } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import React, { FormEventHandler, useEffect, useState } from 'react';

import ContainedButton from 'components/Button/Contained/InfoLargeHeightStretching';
import OutlinedButton from 'components/Button/Outlined/InfoLargeHeightStretching';
import TextInputField from 'components/FormFields/TextInputField';
import { required, strLength3x20 } from 'components/FormFields/validate';
import Popup from 'components/common/Popup';
import { ADD_MODERATOR_BUTTON_BUTTON } from 'containers/Administration/constants';

import useTrigger from 'hooks/useTrigger';
import { styles } from 'containers/Administration/Administration.styled';
import { getSuiUserObject } from 'utils/sui/accountManagement';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSuiWallet } from 'containers/SuiProvider/selectors';
import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import { deleteCookie } from 'utils/cookie';
import { bindActionCreators, compose } from 'redux';
import { logout } from 'containers/Logout/actions';
import { DISPLAY_NAME_FIELD } from 'containers/Profile/constants';
import { saveProfile } from 'containers/EditProfilePage/actions';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/EditProfilePage/reducer';
import saga from 'containers/EditProfilePage/saga';
import { WalletContextState } from '@suiet/wallet-kit';
import { isSuiBlockchain, CONNECTED_SUI_WALLET } from 'utils/constants';

type NewUserRegistrationFormProps = {
  handleSubmit: (addRole: any) => FormEventHandler<HTMLFormElement> | undefined;
  wallet: WalletContextState;
  profile: any;
  dispatch: any;
  logoutDispatch: () => void;
  saveProfileDispatch: ({ profile: any, userKey: any }) => void;
};
const NewUserRegistrationForm: React.FC<NewUserRegistrationFormProps> = ({
  handleSubmit,
  wallet,
  profile,
  dispatch,
  logoutDispatch,
  saveProfileDispatch,
}): JSX.Element => {
  const { t } = useTranslation();
  const [isOpen, open, close] = useTrigger(false);
  const [isSuiUserExists, setIsSuiUserExists] = useState(false);
  const clearAndCloseForm = () => {
    dispatch(reset('newUserRegistrationForm'));
    close();
  };

  const suiLogout = () => {
    wallet.disconnect().then(() => {
      logoutDispatch();
      deleteCookie(CONNECTED_SUI_WALLET);
      dispatch(reset('newUserRegistrationForm'));
    });
  };

  useEffect(() => {
    const fetchSuiUser = async () => {
      const user = await getSuiUserObject(wallet?.address);
      setIsSuiUserExists(user);
      if (wallet?.address && !user) {
        open();
      }
    };

    fetchSuiUser();
  }, [wallet?.address]);

  const suiUserRegistration = (values: any) => {
    saveProfileDispatch({
      profile: {
        about: '',
        avatar: '',
        company: '',
        displayName: values.get(DISPLAY_NAME_FIELD),
        location: '',
        position: '',
      },
      userKey: null,
    });

    clearAndCloseForm();
  };

  return (
    <>
      {isSuiBlockchain && profile && !isSuiUserExists && isOpen && (
        <Popup size="tiny" onClose={suiLogout}>
          <h5 className="tc fz24 semi-bold mb24" css={styles.popupTitle}>
            {t('login.createName')}
          </h5>

          <form onSubmit={handleSubmit(suiUserRegistration)}>
            <Field
              name={DISPLAY_NAME_FIELD}
              component={TextInputField}
              placeholder={t('signUp.displayName')}
              validate={[required, strLength3x20]}
              warn={[required, strLength3x20]}
              warningStyle={styles.validationField}
            />

            <div className="df aic mt32">
              <OutlinedButton className="mr16" onClick={suiLogout}>
                {t('administration.cancel')}
              </OutlinedButton>

              <ContainedButton type="submit" id={ADD_MODERATOR_BUTTON_BUTTON}>
                {t('login.create')}
              </ContainedButton>
            </div>
          </form>
        </Popup>
      )}
    </>
  );
};

const withReducer = injectReducer({ key: 'editProfileReducer', reducer });
const withSaga = injectSaga({
  key: 'editProfileReducer',
  saga,
  disableEject: true,
});

const withConnect = connect(
  createStructuredSelector({
    wallet: selectSuiWallet(),
    profile: makeSelectProfileInfo(),
  }),
  (dispatch) => ({
    logoutDispatch: bindActionCreators(logout, dispatch),
    saveProfileDispatch: bindActionCreators(saveProfile, dispatch),
  }),
);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(
  reduxForm<any, any>({
    form: 'newUserRegistrationForm',
  })(NewUserRegistrationForm),
);
