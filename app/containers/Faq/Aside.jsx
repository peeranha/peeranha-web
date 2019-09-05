import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_PRIMARY } from 'style-constants';
import * as routes from 'routes-config';

import { getSectionCode } from 'utils/faqManagement';

import Span from 'components/Span';

const Aside = ({ faq }) => (
  <ul className="py-2">
    {faq.blocks.map(x => (
      <li className="mb-1" key={x.h2}>
        <a href={routes.appFaq(getSectionCode(x.sectionCode))}>
          <Span color={TEXT_PRIMARY}>{x.h2}</Span>
        </a>
      </li>
    ))}
  </ul>
);

Aside.propTypes = {
  faq: PropTypes.object,
};

export default React.memo(Aside);
