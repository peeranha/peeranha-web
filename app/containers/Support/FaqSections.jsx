import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';
import { TEXT_PRIMARY } from 'style-constants';

import { getSectionCode } from 'utils/faqManagement';

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

const FaqSections = ({ faq }) => (
  <Base>
    <h6>
      <FormattedMessage {...commonMessages.faq} />
    </h6>

    {faq && (
      <ul>
        {faq.blocks.map((x, sectionIndex) => (
          <li>
            <A to={routes.faq(getSectionCode(sectionIndex))}>{x.h2}</A>
          </li>
        ))}
      </ul>
    )}
  </Base>
);

FaqSections.propTypes = {
  faq: PropTypes.array,
};

export default React.memo(FaqSections);
