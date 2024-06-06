import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconLm } from 'components/Icon/IconWithSizes';
import { BORDER_WARNING_LIGHT } from 'style-constants';
import { styles } from 'containers/AISearch/AISearch.styled';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AIIcon from 'images/aiIcon.svg?external';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CheckedIcon from 'images/checkedIcon.svg?external';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Icon from 'components/Icon';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MediumIconStyled style={{ margin: 0 }}>
            <Icon width="32" icon={AIIcon} />
          </MediumIconStyled>
        </div>
        <h3 style={{ fontWeight: 600, fontSize: '38px', marginBottom: '30px' }}>
          {t('common.aiPoweredSearch')}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ marginRight: '8px' }}>
              <IconLm icon={CheckedIcon} fill={BORDER_WARNING_LIGHT} />
            </div>
            <span>
              {t('common.askAI', {
                community: communityName,
              })}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ marginRight: '8px' }}>
              <IconLm icon={CheckedIcon} fill={BORDER_WARNING_LIGHT} />
            </div>
            <span>
              {t('common.accessAI', {
                community: communityName,
              })}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '8px' }}>
              <IconLm icon={CheckedIcon} fill={BORDER_WARNING_LIGHT} />
            </div>
            <span>
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
