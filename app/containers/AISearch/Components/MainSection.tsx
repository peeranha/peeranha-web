import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconLm } from 'components/Icon/IconWithSizes';
import { BORDER_PRIMARY, BORDER_WARNING_LIGHT, ICON_TRASPARENT_BLUE } from 'style-constants';
import { styles } from 'containers/AISearch/AISearch.styled';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AIIcon from 'images/aiIcon.svg?external';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CheckedIcon from 'images/checkedIcon.svg?external';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Icon from 'components/Icon';
import { css } from '@emotion/react';
import { graphCommunityColors, singleCommunityColors } from 'utils/communityManagement';
import { SparkleGraph } from 'icons/index';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const customColor = colors.linkColor || BORDER_PRIMARY;

type Props = {
  sampleQuestions: string[];
  onSampleQuestionClickHandler: (query: string) => void;
  communityName: string;
};

const MainSection: React.FC<Props> = ({
  sampleQuestions,
  onSampleQuestionClickHandler,
  communityName,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <div css={styles.mainSection}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MediumIconStyled style={{ margin: 0 }}>
            {graphCommunity ? (
              <SparkleGraph size={[32, 32]} />
            ) : (
              <Icon
                width="32"
                icon={AIIcon}
                css={css`
                  .fill {
                    fill: ${graphCommunity ? '#fff' : customColor};
                  }
                  .stroke {
                    stroke: ${graphCommunity ? '#fff' : customColor};
                  }
                  .semitransparent {
                    fill: ${graphCommunity
                      ? '#fff'
                      : colors.transparentIconColor || ICON_TRASPARENT_BLUE};
                  }
                `}
              />
            )}
          </MediumIconStyled>
        </div>
        <h3 css={styles.maiHeader}>{t('common.aiPoweredSearch')}</h3>
        <div css={styles.mainTextContainer}>
          <div css={styles.mainTextElement}>
            <div style={{ marginRight: '8px' }}>
              <IconLm
                icon={CheckedIcon}
                fill={BORDER_WARNING_LIGHT}
                css={css`
                  .stroke {
                    stroke: ${graphCommunity ? '#fff' : customColor};
                  }
                `}
              />
            </div>
            <span style={{ color: graphCommunity ? '#E1E1E4' : '#282828' }}>
              {t('common.askAI', {
                community: communityName,
              })}
            </span>
          </div>
          <div css={styles.mainTextElement}>
            <div style={{ marginRight: '8px' }}>
              <IconLm
                icon={CheckedIcon}
                fill={BORDER_WARNING_LIGHT}
                css={css`
                  .stroke {
                    stroke: ${graphCommunity ? '#fff' : customColor};
                  }
                `}
              />
            </div>
            <span style={{ color: graphCommunity ? '#E1E1E4' : '#282828' }}>
              {t('common.accessAI', {
                community: communityName,
              })}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '8px' }}>
              <IconLm
                icon={CheckedIcon}
                fill={BORDER_WARNING_LIGHT}
                css={css`
                  .stroke {
                    stroke: ${graphCommunity ? '#fff' : customColor};
                  }
                `}
              />
            </div>
            <span style={{ color: graphCommunity ? '#E1E1E4' : '#282828' }}>
              {t('common.utilizeAI', {
                community: communityName,
              })}
            </span>
          </div>
        </div>
      </div>
      <div id={'this'} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '30px' }}>
        <div
          onClick={() => onSampleQuestionClickHandler(sampleQuestions[0])}
          css={styles.sampleQuestionButton}
        >
          {sampleQuestions[0]}
        </div>
        <div
          onClick={() => onSampleQuestionClickHandler(sampleQuestions[1])}
          css={styles.sampleQuestionButton}
        >
          {sampleQuestions[1]}
        </div>
      </div>
    </>
  );
};

export default MainSection;
