import React from 'react';
import PropTypes from 'prop-types';

import PositiveChoice from 'components/Button/Contained/PrimaryStretching';
import NegativeChoice from 'components/Button/Contained/TransparentStretching';

const AlreadyVoted = /* istanbul ignore next */ ({
  choice,
  children,
  className,
  onClick,
}) => {
  const Comp = choice ? PositiveChoice : NegativeChoice;

  return (
    <Comp onClick={onClick} className={className} choice={choice}>
      {children}
    </Comp>
  );
};

AlreadyVoted.propTypes = {
  choice: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default React.memo(AlreadyVoted);
