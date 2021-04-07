import React, { useEffect } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { BG_LIGHT, SECONDARY_SPECIAL_3 } from 'style-constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Base from 'components/Base/BaseRounded';
import Span from 'components/Span/index';
import { Div } from 'containers/SignUp/IHaveEOSAccountForm';

import reducer from './reducer';
import saga from './saga';

import * as selectors from './selectors';

import EnterIdLeftMenu from './EnterFacebookId/EnterIdLeftMenu';
import EnterIdRightMenu from './EnterFacebookId/EnterIdRightMenu';

import ConfirmDelLeftMenu from './ConfirmDeletion/ConfirmDelLeftMenu';
import ConfirmDelRightMenu from './ConfirmDeletion/ConfirmDelRightMenu';

import CompletedLeftMenu from './DeletionCompleted/CompletedLeftMenu';
import CompletedRightMenu from './DeletionCompleted/CompletedRightMenu';

import {
  DELETION_COMPLETED,
  CONFIRM_DELETION,
  ENTER_FACEBOOK_ID,
} from './constants';
import {
  checkFacebookId,
  confirmDataDeletion,
  resetStateToInitial,
  sendAnotherCode,
} from './actions';

export const P = Span.extend`
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 30px;
`.withComponent('p');

export const Form = Div.extend`
  position: relative;
`.withComponent('form');

const BaseStyled = styled(Base)`
  display: flex;
  margin: 10px auto;
  max-width: 1200px;
  min-height: 95vh;
  padding: 0 !important;
  overflow: hidden;
`;

const LeftMenu = styled.div`
  flex: 5;
  padding: 40px 50px;
  background: ${BG_LIGHT};
`;

const RightMenu = styled.div`
  flex: 4;
  padding: 40px 80px;
  background: ${SECONDARY_SPECIAL_3};
`;

const DeleteFacebookData = ({
  stage,
  checkFacebookIdDispatch,
  confirmDataDeletionDispatch,
  sendAnotherCodeDispatch,
  locale,
  processing,
  resetStateToInitialDispatch,
}) => {
  // reset state before unmount
  useEffect(() => () => resetStateToInitialDispatch(), []);

  return (
    <>
      {stage === ENTER_FACEBOOK_ID && (
        <div className="container container-mobile">
          <BaseStyled>
            <LeftMenu>
              <EnterIdLeftMenu />
            </LeftMenu>
            <RightMenu>
              <EnterIdRightMenu
                checkFacebookId={checkFacebookIdDispatch}
                locale={locale}
                processing={processing}
              />
            </RightMenu>
          </BaseStyled>
        </div>
      )}

      {stage === CONFIRM_DELETION && (
        <div className="container container-mobile">
          <BaseStyled>
            <LeftMenu>
              <ConfirmDelLeftMenu />
            </LeftMenu>
            <RightMenu>
              <ConfirmDelRightMenu
                confirmDataDeletion={confirmDataDeletionDispatch}
                sendAnotherCode={sendAnotherCodeDispatch}
                locale={locale}
                processing={processing}
              />
            </RightMenu>
          </BaseStyled>
        </div>
      )}

      {stage === DELETION_COMPLETED && (
        <div className="container container-mobile">
          <BaseStyled>
            <LeftMenu>
              <CompletedLeftMenu />
            </LeftMenu>
            <RightMenu>
              <CompletedRightMenu />
            </RightMenu>
          </BaseStyled>
        </div>
      )}
    </>
  );
};

DeleteFacebookData.propTypes = {
  stage: PropTypes.string,
  locale: PropTypes.string,
  checkFacebookIdDispatch: PropTypes.func,
  confirmDataDeletionDispatch: PropTypes.func,
  sendAnotherCodeDispatch: PropTypes.func,
  processing: PropTypes.bool,
  resetStateToInitialDispatch: PropTypes.func,
};

export default React.memo(
  compose(
    injectReducer({ key: 'deleteFacebookData', reducer }),
    injectSaga({ key: 'deleteFacebookData', saga, mode: DAEMON }),

    connect(
      createStructuredSelector({
        locale: makeSelectLocale(),
        stage: selectors.selectStage(),
        processing: selectors.selectDelFbDataProcessing(),
      }),
      dispatch => ({
        checkFacebookIdDispatch: bindActionCreators(checkFacebookId, dispatch),
        resetStateToInitialDispatch: bindActionCreators(
          resetStateToInitial,
          dispatch,
        ),
        confirmDataDeletionDispatch: bindActionCreators(
          confirmDataDeletion,
          dispatch,
        ),
        sendAnotherCodeDispatch: bindActionCreators(sendAnotherCode, dispatch),
      }),
    ),
  )(DeleteFacebookData),
);
