import React from 'react';
import PropTypes from 'prop-types';

import { TEXT_PRIMARY } from 'style-constants';

import Span from 'components/Span';

const Aside = ({ content, route }) => (
  <>
    <ul className="py-2">
      {content.blocks.map(x => (
        <li className="mb-2" key={x.h2}>
          <a href={route(x.sectionCode)}>
            <Span color={TEXT_PRIMARY} fontSize="16" lineHeight="20">
              {x.h2}
            </Span>
          </a>
        </li>
      ))}
    </ul>
  </>
);

Aside.propTypes = {
  content: PropTypes.object,
  route: PropTypes.func,
};

export default React.memo(Aside);
