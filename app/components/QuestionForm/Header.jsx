import { POST_TYPE } from 'utils/constants';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY } from 'style-constants';
import closeIcon from 'images/closeCircle.svg?external';
import questionIcon from 'images/question.svg?external';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import { QuestionGraph, XCircleGraph } from 'components/icons';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import A from '../A';
import Span from '../Span';
import Wrapper from '../Header/Simple';
import H3 from '../H3';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();
const Header = ({ formTitle, postTitle, questionId, postType }) => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3" css={{ background: 'none', border: 'none' }}>
      <H3>
        <MediumIconStyled>
          {graphCommunity ? (
            <QuestionGraph />
          ) : (
            <Icon
              icon={questionIcon}
              width="43"
              color={colors.btnColor || TEXT_PRIMARY}
              isColorImportant={true}
            />
          )}
        </MediumIconStyled>
        <span>{formTitle || postTitle}</span>
      </H3>

      {questionId && (
        <div className="right-panel">
          <A
            to={
              postType === POST_TYPE.documentation
                ? routes.documentation(questionId, formTitle)
                : routes.questionView(questionId, postTitle)
            }
          >
            <button>
              {graphCommunity ? (
                <XCircleGraph className="mr-1" size={[24, 24]} fill="#6F4CFF" />
              ) : (
                <IconMd
                  className="mr-1"
                  icon={closeIcon}
                  fill={colors.btnColor || TEXT_PRIMARY}
                  color={colors.btnColor || TEXT_PRIMARY}
                  isColorImportant={true}
                />
              )}
              <Span
                color={colors.btnColor || TEXT_PRIMARY}
                className="button-label"
                CSS={graphCommunity && { color: '#6F4CFF' }}
              >
                {t('common.close')}
              </Span>
            </button>
          </A>
        </div>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  formTitle: PropTypes.string,
  questionId: PropTypes.string,
};

export default memo(Header);
