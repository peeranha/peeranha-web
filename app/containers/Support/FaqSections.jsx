import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import { getSectionCode } from 'utils/mdManagement';
import { SECTION_ID } from 'containers/Faq/constants';

import A from 'components/A';

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

const FaqSections = ({ faq }) => {
  const faqBlocks = faq.blocks.slice(0, 7).filter((item, index) => index !== 1);

  return (
    <Base>
      <h6>
        <FormattedMessage {...commonMessages.faq} />
      </h6>

      {faq && (
        <ul>
          {faqBlocks.map((x, sectionIndex) => (
            <li key={x.h2}>
              <A to={routes.faq(getSectionCode(SECTION_ID, sectionIndex))}>
                {x.h2}
              </A>
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
