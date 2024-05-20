/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTranslation } from 'react-i18next';

import bannerImage from 'images/answerBlockBG.svg?inline';
import bannerImageGraph from 'images/answerBlockBGGraph.svg?inline';
import bannerImageRed from 'images/answerBG.svg?inline';
import loginImage from 'images/wantAnswer.svg?inline';
import loginGraphImage from 'images/login-graph-banner.svg?inline';
import repliedImage from 'images/repliedAnswer.svg?inline';
import reputationImage from 'images/reputationAnswer.svg?inline';
import graphRepliedImage from 'images/graphRepliedImage.svg?inline';
import graphBadReputation from 'images/graphBadReputation.svg?inline';

import { graphCommunityColors, singleCommunityStyles } from 'utils/communityManagement';

import { BANNER_IMG, ILLUSTRATION_IMG } from './constants';
import { styles } from './BlockedInfoArea.styled';
const communityStyles = singleCommunityStyles();
const graphCommunity = graphCommunityColors();

type BlockedInfoAreaProps = {
  account: string;
  isAnswered: boolean;
  isMinusReputation: boolean;
  showLoginModal: () => void;
  isBanned: boolean;
  isFrozenCommunity: boolean;
};

const BlockedInfoArea: React.FC<BlockedInfoAreaProps> = ({
  account,
  isAnswered,
  isMinusReputation,
  showLoginModal,
  isBanned,
  isFrozenCommunity,
}): JSX.Element => {
  const { t } = useTranslation();
  const viewImage = () => {
    if (!account) {
      return graphCommunity ? loginGraphImage : loginImage;
    }
    if (isAnswered) {
      return graphCommunity ? graphRepliedImage : repliedImage;
    }
    return graphCommunity ? graphBadReputation : reputationImage;
  };

  const viewTitle = () => {
    if (!account) {
      return t('post.answer_login');
    }
    if (isAnswered) {
      return t('post.answer_replied');
    }
    if (isBanned) {
      return t('formFields.banned');
    }
    if (isFrozenCommunity) {
      return t('formFields.frozen');
    }
    return t('post.answer_reputation');
  };

  const viewText = () => {
    if (!account) {
      return t('post.answer_loginText');
    }
    if (isAnswered) {
      return t('post.answer_repliedText');
    }
    if (isFrozenCommunity) {
      return '';
    }
    return t('post.answer_reputationText');
  };

  const viewStyles = () => {
    if (!account) {
      return styles.h3;
    }
    if (isAnswered) {
      return styles.h3Replied;
    }
    return styles.h3Reputation;
  };

  const viewImgStyles = () => {
    if (!account) {
      return styles.imgLogin;
    }
    if (isAnswered) {
      return styles.imgReplied;
    }
    return styles.imgReplied;
  };

  const buttonWithLogin = (clickHandler: () => void) => (
    <button css={styles.button} onClick={clickHandler}>
      {t('common.login')}
    </button>
  );

  return (
    <>
      <div css={styles.container}>
        <img
          css={styles.img}
          src={
            isMinusReputation || isBanned || isFrozenCommunity
              ? bannerImageRed
              : graphCommunity
              ? bannerImageGraph
              : bannerImage
          }
          alt={BANNER_IMG}
        />
        <div css={styles.block}>
          <div css={viewStyles()}>
            <div>{viewTitle()}</div>
            <div>{viewText()}</div>
            {!account && buttonWithLogin(showLoginModal)}
          </div>
          <img css={viewImgStyles()} src={viewImage()} alt={ILLUSTRATION_IMG} />
        </div>
      </div>
    </>
  );
};

export default BlockedInfoArea;
