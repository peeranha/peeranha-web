import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import commonMessages from 'common-messages';

import { TEXT_PRIMARY } from 'style-constants';

import { getIndexes, getQuestionCode } from 'utils/privacyPolicyManagement';

import A from 'components/A';
import H3 from 'components/H3';
import Base from 'components/Base/BaseRounded';
import Header from 'components/Header/Simple';
import BaseTransparent from 'components/Base/BaseTransparent';
import { TextBlock } from 'containers/Faq/Content';
import AsideBG from 'components/Base/AsideBG';

const NavItem = A.extend`
  display: block;
  padding: 6px 0;

  :before {
    font-weight: 600;
    padding-right: 5px;
    color: ${TEXT_PRIMARY};
    content: '${x => x.index + 1}.';
  }
`.withComponent('a');

const View = ({ privacyPolicy }) => {
  const [sectionIndex, questionIndex] = getIndexes(window.location.hash);

  if (!privacyPolicy) {
    return null;
  }

  const section = privacyPolicy.blocks[sectionIndex];
  const question = section.blocks[questionIndex];

  return (
    <div>
      <Header className="mb-3">
        <H3>
          <FormattedMessage {...commonMessages.privacyPolicy} />
        </H3>
      </Header>

      <Base className="p-0">
        <div className="d-flex">
          <div className="flex-grow-1">
            <BaseTransparent>
              <TextBlock
                isOpened
                dangerouslySetInnerHTML={{ __html: question.content }}
              />
            </BaseTransparent>
          </div>

          <AsideBG className="d-none d-xl-block">
            {section.blocks.map((x, index) => (
              <NavItem
                index={index}
                href={routes.privacyPolicy(
                  getQuestionCode(sectionIndex, index),
                )}
              >
                {x.h3}
              </NavItem>
            ))}
          </AsideBG>
        </div>
      </Base>
    </div>
  );
};

View.propTypes = {
  privacyPolicy: PropTypes.array,
};

export default View;
