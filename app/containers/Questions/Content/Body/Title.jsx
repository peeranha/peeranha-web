import { css } from '@emotion/react';
import { languagesEnum } from 'app/i18n';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import A from 'components/A';
import Span from 'components/Span';
import Bounty from 'containers/ViewQuestion/Bounty';

import { APP_FONT } from 'style-constants';

import { singleCommunityFonts } from 'utils/communityManagement';
import { getPostRoute } from 'routes-config';

const fonts = singleCommunityFonts();

const Title = ({ locale, title, id, questionBounty, postType, translation }) => {
  const { t } = useTranslation();
  const link = getPostRoute({ postType, id, title });
  let translatedTitle = title;
  if (translation) {
    translatedTitle = translation.title;
  }

  return (
    <div
      css={css`
        margin: 0 90px 4px 0;
      `}
    >
      <Bounty
        bountyMessage={t('common.bountyPopover')}
        className="questionTitle"
        amount={questionBounty?.amount}
        locale={locale}
      />
      <A to={link} onClick={(event) => event.stopPropagation()}>
        <Span
          fontSize="24"
          lineHeight="31"
          mobileFS="18"
          mobileLH="21"
          letterSpacing={fonts.questionTitleLetterSpacing}
          fontFamily={fonts.questionTitleFont || APP_FONT}
          bold
        >
          {translatedTitle}
        </Span>
      </A>
    </div>
  );
};
Title.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  title: PropTypes.string,
  questionBounty: PropTypes.object,
};

export default memo(Title);
