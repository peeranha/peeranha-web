import React from 'react';
import PropTypes from 'prop-types';
import { TEXT_PRIMARY, TEXT_SUCCESS } from 'style-constants';

import Span from 'components/Span';

import _get from 'lodash/get';
import { getFormattedDate } from '../../utils/datetime';
import {
  MONTH_3LETTERS__DAY_YYYY,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from '../../utils/constants';

const Item = ({ title, id, content, postTime, locale }) => {
  const link = `${process.env.APP_LOCATION}/questions/${id}`;
  const formattedDate = getFormattedDate(
    postTime,
    locale,
    MONTH_3LETTERS__DAY_YYYY_TIME,
  );
  const snippetWithLocale = formattedDate + ' / ' + content;
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
