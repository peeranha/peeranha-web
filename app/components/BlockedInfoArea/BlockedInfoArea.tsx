import React from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './BlockedInfoArea.styled';

import bannerImage from 'images/answerBlockBG.svg?inline';
import bannerImageRed from 'images/answerBG.svg?inline';
import loginImage from 'images/wantAnswer.svg?inline';
import repliedImage from 'images/repliedAnswer.svg?inline';
import reputationImage from 'images/reputationAnswer.svg?inline';
import { BANNER_IMG, ILLUSTRATION_IMG } from './constants';

type BlockedInfoAreaProps = {
  account: string;
  isAnswered: boolean;
  isMinusReputation: boolean;
  showLoginModal: () => void;
};

const BlockedInfoArea: React.FC<BlockedInfoAreaProps> = ({
  account,
  isAnswered,
  isMinusReputation,
  showLoginModal,
}): JSX.Element => {
  const { t } = useTranslation();

  const viewImage = () => {
    if (!account) {
      return loginImage;
    }
    if (isAnswered) {
      return repliedImage;
    }
    return reputationImage;
  };

  const viewTitle = () => {
    if (!account) {
      return t('post.answer_login');
    }
    if (isAnswered) {
      return t('post.answer_replied');
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
    return styles.imgReputation;
  };

  return (
    <>
      <div css={styles.container}>
        <img
          css={styles.img}
          src={isMinusReputation ? bannerImageRed : bannerImage}
          alt={BANNER_IMG}
        />
        <div css={styles.block}>
          <div css={viewStyles()}>
            <div>{viewTitle()}</div>
            <div>{viewText()}</div>
            {!account && (
              <button css={styles.button} onClick={showLoginModal}>
                {t('common.login')}
              </button>
            )}
          </div>
          <img css={viewImgStyles()} src={viewImage()} alt={ILLUSTRATION_IMG} />
        </div>
      </div>
    </>
  );
};

export default BlockedInfoArea;