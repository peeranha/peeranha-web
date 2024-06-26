import React from 'react';
import { useTranslation } from 'react-i18next';

import { singleCommunityColors } from 'utils/communityManagement';

import Span from 'components/Span';

import { Flag } from './Styled';

const colors = singleCommunityColors();

type ChangeLocaleButtonProps = {
  withTitle?: boolean;
  locale: string;
};

const ChangeLocaleButton: React.FC<ChangeLocaleButtonProps> = ({
  withTitle,
  locale,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Span
      className="d-flex align-items-center mr-1"
      fontSize="16"
      lineHeight="20"
      color={colors.commLangColor || colors.commHeadElemColor || '#667085'}
    >
      <Flag src={`https://images.peeranha.io/languages/${locale}_lang.svg`} alt="country" />
      {withTitle ? t(`common.${locale}`) : locale.toLocaleUpperCase()}
    </Span>
  );
};
export default ChangeLocaleButton;
