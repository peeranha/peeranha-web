import React from 'react';
import PropTypes from 'prop-types';

import PositiveChoice from 'components/Button/Contained/PrimaryMedium';
import NegativeChoice from 'components/Button/Contained/TransparentMedium';

const AlreadyVoted = ({
  choice,
  children,
  className,
  onClick,
  id,
  disabled,
}) => {
  let Comp = choice ? PositiveChoice : NegativeChoice;

  Comp = Comp.extend`
    height: 50px;
  `;

  return (
    <Comp
      onClick={onClick}
      className={className}
      choice={choice}
      id={id}
      disabled={disabled}
    >
      {children}
    </Comp>
  );
};

AlreadyVoted.propTypes = {
  choice: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(AlreadyVoted);
