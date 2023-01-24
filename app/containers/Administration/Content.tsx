import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { css } from '@emotion/react';
import React from 'react';

import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import InfoButton from 'components/Button/Outlined/InfoMedium';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import MediumImage from 'components/Img/MediumImage';
import P from 'components/P';
import A from 'components/A';

import { styles } from 'containers/Administration/Administration.styled';
import AreYouSure from 'containers/Administration/AreYouSure';
import { Moderator } from 'containers/Administration/types';

import {
  COMMUNITY_ADMIN_ROLE,
  COMMUNITY_MODERATOR_ROLE,
} from 'utils/constants';
import { getUserAvatar } from 'utils/profileManagement';
import { getCommunityRole } from 'utils/properties';
import { getUserName } from 'utils/user';

import * as routes from 'routes-config';

type ContentProps = {
  locale: string;
  single: number;
  moderators: Array<Moderator>;
  revokeModerator: (userAddress: string, communityId: number) => void;
  communityId: number;
  moderatorsLoading: boolean;
  revokeModeratorLoading: boolean;
};

const getRole = (
  moderator: { permission: string },
  moderatorRole: string,
  adminRole: string,
) => {
  if (moderator.permission === moderatorRole) {
    return t('administration.communityModerator');
  } else if (moderator.permission === adminRole) {
    return t('administration.communityAdministrator');
  }
};

export const Content: React.FC<ContentProps> = ({
  single,
  moderators,
  revokeModerator,
  communityId,
}): JSX.Element => {
  const { t: translate } = useTranslation();
  const moderatorRole = getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId);
  const adminRole = getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId);

  return (
    <BaseRoundedNoPadding className="fdc mb16">
      {moderators.map((moderator, index) => {
        const baseSpecialProps = {
          last: moderators.length - 1 === index,
          first: !index,
        };

        return (
          <BaseSpecial
            {...baseSpecialProps}
            className="dg jcc aic"
            css={css`
              grid-template-columns: 4fr 6fr 4fr 1fr;
            `}
            key={moderator.id}
          >
            <div css={css(styles.mainInfo)}>
              <MediumImage
                isBordered
                className="flex-shrink-0 mr8"
                src={getUserAvatar(moderator.user.avatar)}
                alt="avatar"
              />

              <A
                className="ovh"
                to={routes.profileView(moderator.user.id)}
                key={moderator.user.id}
              >
                <P className="text-ellipsis fz14">
                  {getUserName(moderator.user.displayName, moderator.user.id)}
                </P>
              </A>
            </div>

            <div className="mr16 tc text-ellipsis fz14">
              {moderator.user.id}
            </div>

            <div className="mr16 tc text-ellipsis fz14">
              {getRole(moderator, moderatorRole, adminRole)}
            </div>

            <div
              css={css`
                min-width: 90px;
                text-align: center;
              `}
            >
              {moderator.permission === moderatorRole && (
                <div id={`moderator_delete_${moderator.user.id}`}>
                  <AreYouSure
                    submitAction={() => {
                      revokeModerator(moderator.user.id, single);
                    }}
                    Button={({
                      onClick,
                    }: {
                      onClick: React.MouseEventHandler<HTMLButtonElement>;
                    }) => (
                      <InfoButton
                        id={`moderator_delete_${moderator.user.id}`}
                        onClick={onClick}
                      >
                        {translate('administration.revoke')}
                      </InfoButton>
                    )}
                  />
                </div>
              )}
            </div>
          </BaseSpecial>
        );
      })}
    </BaseRoundedNoPadding>
  );
};

export default React.memo(Content);
