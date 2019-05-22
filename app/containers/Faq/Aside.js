import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_PRIMARY } from 'style-constants';
import * as routes from 'routes-config';

import Span from 'components/Span';

import { SECTION_ID } from './constants';

const Aside = ({ faq }) => (
  <ul className="py-2">
    {faq.blocks.map((x, index) => (
      <li className="mb-1" key={x.h2}>
        <a href={`${routes.appFaq()}#${SECTION_ID}_${index}`}>
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
