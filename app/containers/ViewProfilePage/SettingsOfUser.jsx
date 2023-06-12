import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as clipboard from 'clipboard-polyfill';

import { TEXT_DARK, TEXT_PRIMARY, LINK_COLOR } from 'style-constants';

import { showPopover } from 'utils/popover';

import Base from 'components/Base/BaseRounded';
import NotFound from '../ErrorPage';
import AuthorizationData from './AuthorizationData';

export const BaseStyled = Base.extend`
  > :nth-child(2) {
    margin: 30px 0;
    padding: 0 30px;
  }

  table {
    width: 100%;

    tr td {
      .link-btn {
        color: ${LINK_COLOR};
      }

      :nth-child(1) {
        color: ${TEXT_DARK};
        font-weight: bold;
        padding: 0 0 20px 0;
        white-space: nowrap;
      }

      :nth-child(2) {
        padding: 0 0 20px 0;
      }

      :nth-child(3) {
        color: ${TEXT_PRIMARY};
        padding: 0 0 20px 0;
        text-align: right;
        white-space: nowrap;
      }
    }
  }

  table#referral {
    tr td {
      button {
      }
      :nth-child(2) {
        color: ${TEXT_PRIMARY};
        padding: 0;
        text-align: right;
        white-space: nowrap;

        @media only screen and (max-width: 576px) {
          padding-bottom: 20px;
        }
      }
    }
  }

  #link {
    display: flex;
    flex-direction: column;
  }

  td a,
  #code {
    margin-top: 5px;
    color: ${TEXT_PRIMARY};
    font-weight: normal;
  }

  h3 {
    margin-bottom: 14px;
  }

  @media only screen and (max-width: 576px) {
    > :nth-child(2) {
      margin: 20px 0 0;
      padding: 0;
    }

    table * {
      text-align: left;
      font-size: 14px !important;
      line-height: 14px !important;
    }

    table {
      tr {
        display: flex;
        flex-direction: column;
      }

      tr td {
        padding: 0 30px 20px 0px;
        text-align: left !important;
      }
    }
  }
`;

const SettingsOfUser = ({
  className,
  locale,
  activeKey,
  ownerKey,
  loginData,
  isAvailable,
  profile,
}) => {
  const { t } = useTranslation();

  const writeToBuffer = (event) => {
    clipboard.writeText(event.currentTarget.dataset.key);
    showPopover(event.currentTarget.id, t('common.copied'));
  };

  return isAvailable ? (
    <div>
      <AuthorizationData className={className} />
    </div>
  ) : (
    <div className={className}>
      <NotFound withSeo={false} />
    </div>
  );
};

SettingsOfUser.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  user: PropTypes.string,
  isAvailable: PropTypes.bool,
  profile: PropTypes.object,
  account: PropTypes.string,
};

export default React.memo(SettingsOfUser);
