import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { css } from '@emotion/react';

import Label from 'components/FormFields/Label';
import { FULL_RULES_LINK } from 'app/constants/rules';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { LINK_COLOR } from 'style-constants';
import { styles } from './PostRules.styled';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const messagesArray = [
  'common.contentPopupBlock_3',
  'common.contentPopupBlock_4',
  'common.contentPopupBlock_5',
  'common.contentPopupBlock_6',
  'common.contentPopupBlock_7',
];

const PostRules = () => {
  const { t } = useTranslation();

  return (
    <div css={css(styles.wrapper)}>
      <Label css={css(styles.title)}>{t('common.postRules')}:</Label>
      <ul css={css(styles.list)}>
        {messagesArray.map((item) => (
          <li key={item} css={css(styles.listItem)}>
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>
      <div css={css(styles.secondaryText)}>
        <span css={css(styles.fullRules)}>
          <Trans
            i18nKey="common.contentPopupBlock_8"
            components={[
              <a
                href={FULL_RULES_LINK}
                key="0"
                target="_blank"
                css={{
                  color: graphCommunity ? '#6F4CFF' : colors.linkColor || LINK_COLOR,
                  ':hover': {
                    color: graphCommunity ? 'rgba(111,76,255,0.8)' : colors.linkColor || LINK_COLOR,
                  },
                }}
              />,
            ]}
          />
        </span>
        <span>{t('common.moderatorsCanDeletePosts')}</span>
      </div>
    </div>
  );
};

export default PostRules;
