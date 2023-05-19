import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY } from 'style-constants';

import A from 'components/A';
import {
  DOCUMENTATION_ABOUT_LINK,
  DOCUMENTATION_COMMUNITY_LINK,
  DOCUMENTATION_POSTS_ANSWERS_COMMENTS_LINK,
  DOCUMENTATION_REPUTATION_PRIVILEGES_LINK,
} from 'app/constants/documentation';

const Base = styled.div`
  h6 {
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 10px;

    ${A} {
      color: ${TEXT_PRIMARY};
    }
  }
`;

const links = [
  { link: DOCUMENTATION_ABOUT_LINK, text: 'common.aboutPeeranha' },
  { link: DOCUMENTATION_COMMUNITY_LINK, text: 'common.communities' },
  {
    link: DOCUMENTATION_POSTS_ANSWERS_COMMENTS_LINK,
    text: 'common.postsAnswersComments',
  },
  {
    link: DOCUMENTATION_REPUTATION_PRIVILEGES_LINK,
    text: 'common.statusReputationPrivileges',
  },
];

const FaqSections = ({ faq }) => {
  const { t } = useTranslation();

  return (
    <Base>
      <h6>{t('common.documentation')}</h6>
      <ul>
        {links.map((x) => (
          <li key={t(x.text)}>
            <a href={x.link} target="_blank">
              {t(x.text)}
            </a>
          </li>
        ))}
      </ul>
    </Base>
  );
};

FaqSections.propTypes = {
  faq: PropTypes.object,
};

export default React.memo(FaqSections);
