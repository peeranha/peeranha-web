import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BG_PRIMARY } from 'style-constants';

import Container from 'components/Labels/QuestionType';

import Popover from './Popover';
import { Languages } from 'icons/index';
import { languagesWithDescriptions } from 'app/i18n';
import { css } from '@emotion/react';

const LanguageLabel: React.FC<{
  isSearch?: boolean;
  language: string;
  isFeed: boolean;
}> = ({ isSearch = false, language, isFeed }) => {
  const { t } = useTranslation();
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <div>
      <span
        css={css`
          > div {
            position: inherit;
          }
        `}
      >
        <Container
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          size="sm"
        >
          {visible && (
            <Popover
              label={
                t('common.translatedFrom') +
                t(
                  `common.${
                    languagesWithDescriptions.find(
                      (obj) => obj.language === language,
                    ).description
                  }`,
                )
              }
              items={[]}
              isSearch={isSearch}
              right={isFeed ? -68 : 0}
            />
          )}
          <Languages stroke={BG_PRIMARY} fill={'#e5ebff'} />
        </Container>
      </span>
    </div>
  );
};

export default memo(LanguageLabel);
