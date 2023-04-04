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
  DOCUMENTATION_ABOUT_LINK,
  DOCUMENTATION_COMMUNITY_LINK,
  DOCUMENTATION_POSTS_ANSWERS_COMMENTS_LINK,
  DOCUMENTATION_REPUTATION_PRIVILEGES_LINK,
];

const FaqSections = ({ faq }) => {
  const { t } = useTranslation();
  const faqBlocks = faq.blocks.slice(0, 5).filter((item, index) => index !== 1);

  return (
    <Base>
      <h6>{t('common.documentation')}</h6>

      {faq && (
        <ul>
          {faqBlocks.map((x, sectionIndex) => (
            <li key={x.h2}>
              <a href={links[sectionIndex]} target="_blank">
                {x.h2}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Base>
  );
};

FaqSections.propTypes = {
  faq: PropTypes.object,
};

export default React.memo(FaqSections);
