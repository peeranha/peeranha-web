import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BG_PRIMARY } from 'style-constants';

import Container from 'components/Labels/QuestionType';

import Popover from './Popover';
import { Languages } from 'icons/index';
import { languagesWithDescriptions } from 'app/i18n';

const LabelItem = styled.span`
  > div {
    position: inherit;
  }
`;

const LanguageLabel: React.FC<{ isSearch: boolean; language: string }> = ({
  isSearch = false,
  language,
}) => {
  const { t } = useTranslation();
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  return (
    <div>
      <LabelItem>
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
              right={-68}
            />
          )}
          <Languages stroke={BG_PRIMARY} fill={'#e5ebff'} />
        </Container>
      </LabelItem>
    </div>
  );
};

export default memo(LanguageLabel);
