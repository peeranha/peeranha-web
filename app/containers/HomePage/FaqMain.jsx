import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { TEXT_WARNING_LIGHT, BORDER_SECONDARY } from 'style-constants';

import * as routes from 'routes-config';

import { getSectionCode } from 'utils/faqManagement';
import { ABOUT_PEERANHA_SECTION } from 'containers/Faq/constants';

import plusIcon from 'images/Plus.svg?inline';
import arrRight from 'images/arrRight.svg?inline';

import { FOURTH_SCREEN } from './constants';
import messages from './messages';

import Section from './Section';

const Box = Section.extend`
  .item {
    display: flex;
    align-items: center;
    padding: 20px 0;

    img {
      width: 29px;
      margin-right: 20px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid ${BORDER_SECONDARY};
    }

    &.item-all a {
      color: ${TEXT_WARNING_LIGHT};
    }
  }

  @media only screen and (max-width: 992px) {
    .item {
      font-size: 24px;
      line-height: 30px;

      img {
        margin-right: 10px;
      }
    }
  }
`;

const FaqMain = ({ faqQuestions }) => (
  <Box className="container" id={FOURTH_SCREEN}>
    {faqQuestions.map(x => (
      <h3 className="item">
        <img src={plusIcon} alt="icon" />
        {x}
      </h3>
    ))}

    <h3 className="item item-all">
      <img src={arrRight} alt="icon" />
      <a href={routes.faq(getSectionCode(ABOUT_PEERANHA_SECTION))}>
        <FormattedMessage {...messages.getMoreAnswers} />
      </a>
    </h3>
  </Box>
);

FaqMain.propTypes = {
  faqQuestions: PropTypes.any.isRequired,
};

export default React.memo(FaqMain);
