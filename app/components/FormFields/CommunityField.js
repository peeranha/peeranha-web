/* eslint no-param-reassign: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isSingleCommunityWebsite } from 'utils/communityManagement';
import arrowDownIcon from 'images/arrowDown.svg?inline';

import CommunitySelector from 'components/CommunitySelector';
import Img from 'components/Img';
import { Input } from 'components/Input/InputStyled';
import Span from 'components/Span';
import { DEFAULT_COMMUNITY_ID } from 'components/QuestionForm/constants';
import Wrapper from './Wrapper';

const single = isSingleCommunityWebsite();

const Div = styled.div`
  position: relative;

  ${(props) => Input(props)};

  img[alt='icon'] {
    position: absolute;
    right: 0;
  }
`;

export const CommunityField = ({
  input,
  meta,
  label,
  tip,
  splitInHalf,
  disabled,
  className,
  options,
  communityId,
  isHasRoleGlobal,
  isCommunityModerator,
  isEditForm,
  isPostAuthor,
  subcommunityIds,
}) => {
  if (input) {
    input.value = input.value.toJS ? input.value.toJS() : input.value;
  }

  const communityList = () => {
    if (isEditForm && isCommunityModerator && !isHasRoleGlobal && !isPostAuthor) {
      return options.filter((item) => item.id === DEFAULT_COMMUNITY_ID || item.id === communityId);
    }
    if (Boolean(subcommunityIds?.length)) {
      const subcommunityList = [single, ...subcommunityIds];
      return options.filter((item) => subcommunityList.includes(item.id));
    }
    return options;
  };

  return (
    <Wrapper
      className={className}
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      id={input.name}
    >
      <CommunitySelector
        input={input}
        disabled={disabled}
        selectedCommunityId={input.value?.id ?? 0}
        communities={communityList()}
        Button={({ communityAvatar, communityLabel }) => (
          <Div
            className="d-flex align-items-center"
            error={meta.visited && (meta.error || meta.warning)}
            disabled={disabled}
          >
            {communityAvatar && (
              <>
                <Img className="mr-2" src={communityAvatar} alt="comm_img" />
              </>
            )}
            <Span>{communityLabel}</Span>
            <img className="mr-2" src={arrowDownIcon} alt="icon" />
          </Div>
        )}
      />
    </Wrapper>
  );
};

CommunityField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string,
  tip: PropTypes.string,
  disabled: PropTypes.bool,
  splitInHalf: PropTypes.bool,
  options: PropTypes.array,
  subcommunityIds: PropTypes.array,
};

export default CommunityField;
