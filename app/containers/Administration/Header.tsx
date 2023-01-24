import { useTranslation } from 'react-i18next';
import React from 'react';

import { MediumIconStyled } from 'components/Icon/MediumIcon';
import Wrapper from 'components/Header/Simple';
import Icon from 'components/Icon';
import H3 from 'components/H3';

import AddModeratorForm from 'containers/Administration/AddModeratorForm';

import usersHeader from 'images/usersHeader.svg?external';
import AddModeratorButton from 'containers/Administration/AddModeratorButton';

import { singleCommunityColors } from 'utils/communityManagement';
import { BORDER_PRIMARY } from 'style-constants';
const colors = singleCommunityColors();

type HeaderProps = {
  locale: string;
  single?: number;
  addModerator: (userAddress: string, communityId: number) => void;
  addModeratorLoading: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  locale,
  single,
  addModerator,
  addModeratorLoading,
}): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={usersHeader}
            width="38"
            color={colors.btnColor || BORDER_PRIMARY}
            isColorImportant={true}
          />
        </MediumIconStyled>
        {t('common.administration')}
      </H3>
      <AddModeratorForm
        locale={locale}
        single={single}
        addModerator={addModerator}
        Button={AddModeratorButton}
        addModeratorLoading={addModeratorLoading}
      />
    </Wrapper>
  );
};

export default React.memo(Header);
