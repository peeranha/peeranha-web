import React from 'react';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AIIcon from 'images/aiIcon.svg?external';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import UserIcon from 'images/userInChat.svg?external';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Icon from 'components/Icon';
import MarkdownPreviewBlock from 'components/TextEditor/MarkdownPreview';
import CopyTextIcon from 'icons/CopyText';
import OutlinedButton from 'components/Button/Outlined/InfoMedium';
import { showPopover } from 'utils/popover';
import useMediaQuery from 'hooks/useMediaQuery';

import { styles } from '../AISearch.styled';

type Props = {
  index: number;
  question: string;
  answer: { answer: string; resources: { url: string; title: string }[] };
  answerNotFinished: boolean;
  onAskInCommunityHandler: () => void;
};

const ChatFragment: React.FC<Props> = ({
  index,
  question,
  answer,
  answerNotFinished,
  onAskInCommunityHandler,
}): JSX.Element => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const writeToBuffer = (event: { currentTarget: { id: any } }) => {
    navigator.clipboard.writeText(answer.answer);

    if (isDesktop) {
      showPopover(event.currentTarget.id, t('common.copied'));
    }
  };

  return (
    <>
      <div css={styles.chatFragmentContainer}>
        <div css={styles.iconContainer}>
          <MediumIconStyled style={{ margin: 0, background: 'none' }}>
            <Icon width="19" icon={UserIcon} />
          </MediumIconStyled>
        </div>
        <div css={styles.chatInfo}>
          <div css={styles.username}>{t('common.you')}</div>
          <div css={styles.text}>{question}</div>
        </div>
      </div>

      {answer && (
        <div css={{ marginBottom: '30px' }}>
          <div css={styles.chatFragmentContainer}>
            <div css={styles.iconContainer}>
              <MediumIconStyled style={{ margin: 0, background: 'none' }}>
                <Icon width="32" icon={AIIcon} />
              </MediumIconStyled>
            </div>
            <div css={styles.chatInfo}>
              <div css={styles.username}>{t('common.aiPoweredSearch')}</div>
              <div css={styles.text}>
                <MarkdownPreviewBlock content={answer.answer} />
              </div>
            </div>
          </div>
          {!answerNotFinished && (
            <div css={styles.buttonChatContainer}>
              <div css={styles.row}>
                {answer.resources.map((resource, innerIndex) => (
                  <div css={styles.button} key={innerIndex}>
                    <div css={styles.tagIndex}>{innerIndex + 1} </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      style={{ color: 'rgba(102, 112, 133, 1)' }}
                    >
                      {resource.title.length > 20
                        ? `${resource.title.slice(0, 20)}...`
                        : resource.title}
                    </a>
                  </div>
                ))}
              </div>
              <div css={styles.row}>
                {/* <div style={{ marginRight: '16px', cursor: 'pointer' }}> */}
                {/*  <LikeIcon stroke="rgba(87, 111, 237, 1)" /> */}
                {/* </div> */}
                {/* <div style={{ marginRight: '16px', cursor: 'pointer' }}> */}
                {/*  <DisLikeIcon stroke="rgba(87, 111, 237, 1)" /> */}
                {/* </div> */}
                <div
                  style={{ marginRight: '24px', cursor: 'pointer' }}
                  onClick={writeToBuffer}
                  id={`${index}-copy-to-buffer`}
                >
                  <CopyTextIcon
                    stroke="rgba(87, 111, 237, 1)"
                    fill="rgba(173, 186, 255, 0.2)"
                    className="rgba(87, 111, 237, 1)"
                  />
                </div>

                <OutlinedButton onClick={onAskInCommunityHandler}>
                  {t('common.askInCommunity')}
                </OutlinedButton>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatFragment;
