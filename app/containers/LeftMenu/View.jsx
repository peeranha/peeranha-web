import { css } from '@emotion/react';
import { HEADER_HEIGHT } from 'containers/Header/constants';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  BG_PRIMARY_BLANKET,
  BG_PRIMARY_SPECIAL,
  BORDER_PRIMARY_DARK,
  SCROLLBAR_COLOR,
} from 'style-constants';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';

import MainLinks from 'containers/LeftMenu/MainLinks';
import MobileLinksInProfile from 'containers/LeftMenu/MobileLinksInProfile';
import MobileAdditionalLinks from 'containers/LeftMenu/MobileAdditionalLinks';
import MobileAutorizationButtons from 'containers/LeftMenu/MobileAutorizationButtons';
import Footer from 'containers/Footer';
import { ViewStyled } from 'containers/LeftMenu/Styles';
import { styles } from 'containers/LeftMenu/MainLinks.styled';
import { isSuiBlockchain } from 'utils/constants';

const single = isSingleCommunityWebsite();

const View = ({
  profile,
  isMenuVisible,
  showLoginModal,
  changeLocale,
  locale,
  documentationMenu,
  redirectToEditQuestionPage,
  redirectToPostDocumentationPage,
  deleteQuestion,
  match,
  toggleEditDocumentation,
  isEditDocumentation,
  pinnedItemMenu,
  communities,
  startOverDispatch,
  chatStarted,
}) => {
  const [currClientHeight, setClientHeight] = useState();

  useEffect(() => setClientHeight(document.documentElement.clientHeight), []);
  // change links display on window resize
  const windowResizeHandler = () => setClientHeight(document.documentElement.clientHeight);

  useEffect(() => {
    window.addEventListener(`resize`, windowResizeHandler, false);
    return () => window.removeEventListener('resize', windowResizeHandler);
  }, []);

  return (
    <ViewStyled
      id={LEFT_MENU_ID}
      single={single}
      isMenuVisible={isMenuVisible}
      css={css`
        height: 100vh;
        overflow: hidden;
        padding-right: ${isSuiBlockchain ? '0px' : '6px'};

        @media (min-width: 992px) {
          height: ${single ? 'max-content' : `calc(100vh - ${HEADER_HEIGHT}px)`};
        }
        :hover {
          overflow-y: ${isSuiBlockchain ? 'unset' : 'scroll'};
          padding-right: 0;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: ${BG_PRIMARY_BLANKET};
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(53, 74, 137, 0.25);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(53, 74, 137, 0.5);
        }
      `}
    >
      <MobileAutorizationButtons
        profile={profile}
        isMenuVisible={isMenuVisible}
        showLoginModal={showLoginModal}
      />

      <MobileLinksInProfile profile={profile} isMenuVisible={isMenuVisible} />

      {/* TODO: return if WalletDropdown will be needed in production */}
      {/* <MobileLinksInWallet */}
      {/*  profile={profile} */}
      {/*  isMenuVisible={isMenuVisible} */}
      {/*  balance={balance} */}
      {/*  stakedInCurrentPeriod={stakedInCurrentPeriod} */}
      {/*  stakedInNextPeriod={stakedInNextPeriod} */}
      {/*  boost={boost} */}
      {/* /> */}

      <MobileAdditionalLinks profile={profile} isMenuVisible={isMenuVisible} />

      <MainLinks
        currClientHeight={currClientHeight}
        profile={profile}
        documentationMenu={documentationMenu}
        redirectToEditQuestionPage={redirectToEditQuestionPage}
        redirectToPostDocumentationPage={redirectToPostDocumentationPage}
        deleteQuestion={deleteQuestion}
        match={match}
        toggleEditDocumentation={toggleEditDocumentation}
        isEditDocumentation={isEditDocumentation}
        pinnedItemMenu={pinnedItemMenu}
        changeLocale={changeLocale}
        isMenuVisible={isMenuVisible}
        locale={locale}
        communities={communities}
        startOverDispatch={startOverDispatch}
        chatStarted={chatStarted}
      />
      <div css={styles.footer}>
        <Footer />
      </div>
    </ViewStyled>
  );
};

View.propTypes = {
  profile: PropTypes.object,
  balance: PropTypes.number,
  stakedInCurrentPeriod: PropTypes.number,
  stakedInNextPeriod: PropTypes.number,
  boost: PropTypes.number,
  isMenuVisible: PropTypes.bool,
  showLoginModal: PropTypes.func,
  changeLocale: PropTypes.func,
  locale: PropTypes.string,
  communities: PropTypes.object,
};

export default View;
