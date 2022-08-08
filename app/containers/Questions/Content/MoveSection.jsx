import React, { memo } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import ArrowDownCircleIcon from 'icons/ArrowDownCircle';

const MoveButton = styled.button`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Container = styled.div`
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  > div {
    height: 50%;
    display: flex;
    align-items: center;

    > button svg {
      width: 20px;
    }
  }

  > div:nth-child(1) button svg {
    transform: rotate(180deg);
  }
`;
/*  @media only screen and (max-width: 576px) {
    flex-direction: row;

    > div {
      width: 50%;
      justify-content: center;
    }
  } */
const MoveSection = ({
  first,
  last,
  topQuestionActionProcessing,
  upQuestionMethod,
  downQuestionMethod,
}) => (
  <Container first={first} last={last}>
    <div>
      {!first && (
        <MoveButton
          disabled={topQuestionActionProcessing}
          onClick={upQuestionMethod}
        >
          <ArrowDownCircleIcon stroke="#444444" />
        </MoveButton>
      )}
    </div>
    <div>
      {!last && (
        <MoveButton
          disabled={topQuestionActionProcessing}
          onClick={downQuestionMethod}
        >
          <ArrowDownCircleIcon stroke="#444444" />
        </MoveButton>
      )}
    </div>
  </Container>
);

MoveSection.propTypes = {
  first: PropTypes.bool,
  last: PropTypes.bool,
  upQuestionMethod: PropTypes.func,
  downQuestionMethod: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
};

export default memo(MoveSection);
