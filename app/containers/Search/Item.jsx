import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_SUCCESS } from 'style-constants';

import Span from 'components/Span';

import _get from 'lodash/get';
import { getFormattedDate } from '../../utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY } from '../../utils/constants';

const Item = ({ title, link, snippet, pagemap, locale }) => {
  const date = new Date(
    _get(pagemap.metatags[0], 'article:published_time', ''),
  );
  const formattedDate = getFormattedDate(
    date.valueOf() / 1000,
    locale,
    MONTH_3LETTERS__DAY_YYYY,
  );
  const snippetWithLocale =
    formattedDate + snippet.slice(formattedDate.length + 1);
  return (
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
        <Span fontSize="15">{snippetWithLocale}</Span>
      </div>
    </li>
  );
};

Item.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  snippet: PropTypes.string,
};

export default React.memo(Item);
