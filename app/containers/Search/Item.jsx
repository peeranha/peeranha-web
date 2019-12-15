import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_SUCCESS } from 'style-constants';

import Span from 'components/Span';

const Item = ({ title, link, snippet }) => (
  <li className="mb-3">
    <div>
      <a href={link} target="_blank">
        <Span fontSize="18" color={TEXT_PRIMARY}>
          {title}
        </Span>
      </a>
    </div>

    <div>
      <Span fontSize="13" color={TEXT_SUCCESS}>
        {link}
      </Span>
    </div>

    <div className="mt-1">
      <Span fontSize="15">{snippet}</Span>
    </div>
  </li>
);

Item.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  snippet: PropTypes.string,
};

export default React.memo(Item);
