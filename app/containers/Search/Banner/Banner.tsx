import React from 'react';

import { FormattedMessage } from 'react-intl';
import Button from 'components/common/Button';
import PlusWithoutCircle from 'icons/PlusWithoutCircle';
import noSearchResults from 'images/noSearchResults.png';
import { styled } from './Banner.styled';
import messages from '../messages';
import { BG_LIGHT } from '../../../style-constants';

import { singleCommunityColors } from '../../../utils/communityManagement';

const colors = singleCommunityColors();

type BannerProps = {
  profileInfo: object;
  redirectToAskQuestionPage: () => void;
  showLoginModalWithRedirectToAskQuestionPage: () => void;
};

const Banner: React.FC<BannerProps> = ({
  profileInfo,
  redirectToAskQuestionPage,
  showLoginModalWithRedirectToAskQuestionPage,
}): JSX.Element => (
  <div css={styled.banner}>
    <div className="df fdc p16" css={styled.container}>
      <div className="df jcc pt16 pb16">
        <img src={noSearchResults} css={styled.image} alt="no search results" />
      </div>
      <div className="mt24">
        <p className="fz16" css={styled.text}>
          <FormattedMessage id={messages.noSearchResults.id} />
        </p>
        <Button
          onClick={
            profileInfo
              ? redirectToAskQuestionPage
              : showLoginModalWithRedirectToAskQuestionPage
          }
          className="mt24"
          css={styled.button}
        >
          <FormattedMessage id={messages.askQuestion.id} />
        </Button>
      </div>
    </div>
  </div>
);

export default Banner;
