// @ts-ignore
import { FormattedMessage } from 'react-intl';
// @ts-ignore
import { translationMessages } from 'i18n';
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

// @ts-ignore
import userBodyIconAvatar from 'images/user2.svg?external';
// @ts-ignore
import { BORDER_SECONDARY } from 'style-constants';
import messages from 'containers/Administration/messages';

type ContentProps = {
  locale: string;
  single: number;
  moderators: Array<Moderator>;
  revokeModerator: Function;
  communityId: number;
  moderatorsLoading: boolean;
  revokeModeratorLoading: boolean;
};

export const Content: React.FC<ContentProps> = ({
  locale,
  single,
  moderators,
  revokeModerator,
  communityId,
  moderatorsLoading,
  revokeModeratorLoading,
}): JSX.Element | null => {
  const moderatorRole = getCommunityRole(COMMUNITY_MODERATOR_ROLE, communityId);
  const adminRole = getCommunityRole(COMMUNITY_ADMIN_ROLE, communityId);
  return (
    <BaseRoundedNoPadding className="fdc mb16">
      {moderators.map((moderator, index) => {
        let role;
        if (moderator.permission === moderatorRole) {
          role = translationMessages[locale][messages.communityModerator];
        } else if (moderator.permission === adminRole) {
          role = translationMessages[locale][messages.communityAdministrator];
        }

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
                {...{ isBordered: true }}
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

            <div className="mr16 tc text-ellipsis fz14">{role}</div>

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
                    // @ts-ignore
                    Button={({
                      onClick,
                    }: {
                      onClick: React.MouseEventHandler<HTMLButtonElement>;
                    }) => (
                      <InfoButton
                        id={`moderator_delete_${moderator.user.id}`}
                        onClick={onClick}
                      >
                        <FormattedMessage id={messages.revoke.id} />
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
