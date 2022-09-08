import React, { memo } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY } from 'style-constants';

import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

import closeIcon from 'images/closeCircle.svg?external';
import questionIcon from 'images/question.svg?external';

import A from '../A';
import Span from '../Span';

import Wrapper from '../Header/Simple';
import H3 from '../H3';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const Header = ({ formTitle, questionId }) => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          <Icon
            icon={questionIcon}
            width="43"
            color={colors.btnColor || TEXT_PRIMARY}
            isColorImportant={true}
          />
        </MediumIconStyled>
        <span>{formTitle}</span>
      </H3>

      {questionId && (
        <div className="right-panel">
          <A to={routes.questionView(questionId)}>
            <button>
              <IconMd
                className="mr-1"
                icon={closeIcon}
                fill={colors.btnColor || TEXT_PRIMARY}
                color={colors.btnColor || TEXT_PRIMARY}
                isColorImportant={true}
              />
              <Span
                color={colors.btnColor || TEXT_PRIMARY}
                className="button-label"
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
