import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import arrowDownIcon from 'svg/arrowDown';

import CommunitySelector from 'components/CommunitySelector';
import Img from 'components/Img';
import { Input } from 'components/Input/InputStyled';
import Span from 'components/Span';
import Icon from 'components/Icon';
import IconStyled from 'components/Icon/IconStyled';

import Wrapper from './Wrapper';

const Div = styled.div`
  position: relative;

  ${props => Input(props)};

  ${IconStyled} {
    position: absolute;
    right: 0;
  }
`;

const CommunityField = ({ input, meta, label, tip, disabled }) => (
  <Wrapper label={label} tip={tip} meta={meta}>
    <CommunitySelector
      input={input}
      disabled={disabled}
      selectedCommunityId={input.value ? input.value.id : 0}
      Button={({ toggleOpen, communityAvatar, communityLabel }) => (
        <Div
          className="d-flex align-items-center"
          error={meta.touched && (meta.error || meta.warning)}
          disabled={disabled}
          onClick={toggleOpen}
        >
          {communityAvatar && (
            <React.Fragment>
              <Img className="mr-2" src={communityAvatar} alt="comm_img" />
              <Span>{communityLabel}</Span>
            </React.Fragment>
          )}

          <Icon icon={arrowDownIcon} />
        </Div>
      )}
    />
  </Wrapper>
);

CommunityField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string,
  disabled: PropTypes.bool,
};

export default React.memo(CommunityField);
