import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import A from 'components/A';
import Span from 'components/Span';
import Bounty from 'containers/ViewQuestion/Bounty';

import { APP_FONT } from 'style-constants';

import { singleCommunityFonts } from 'utils/communityManagement';
import styled from 'styled-components';
import { getPostRoute } from 'routes-config';

const Wrapper = styled.div`
  margin-right: 30px;
`;

const fonts = singleCommunityFonts();

const Title = ({ locale, title, id, questionBounty, postType }) => {
  const { t } = useTranslation();
  const link = getPostRoute(postType, id);

  return (
    <Wrapper className="mb-1">
      <Bounty
        bountyMessage={t('common.bountyPopover')}
        className="questionTitle"
        amount={questionBounty?.amount}
        locale={locale}
      />
      <A to={link}>
        <Span
          fontSize="24"
          lineHeight="31"
          mobileFS="18"
          mobileLH="21"
          letterSpacing={fonts.questionTitleLetterSpacing}
          fontFamily={fonts.questionTitleFont || APP_FONT}
          bold
        >
          {title}
        </Span>
      </A>
    </Wrapper>
  );
};
Title.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  title: PropTypes.string,
  questionBounty: PropTypes.object,
};

export default memo(Title);
