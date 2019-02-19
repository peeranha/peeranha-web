import React from 'react';
import PropTypes from 'prop-types';

import A from 'components/A';
import Button from 'components/Button';

const MyProfileButton = ({ account, userId, href, children, disabled }) => {
  if (account !== userId) {
    return null;
  }

  return (
    <A to={href} href={href}>
      <Button disabled={disabled} isLink={window.location.pathname !== href}>
        {React.Children.toArray(children)}
      </Button>
    </A>
  );
};

MyProfileButton.propTypes = {
  account: PropTypes.string,
  userId: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.element,
  disabled: PropTypes.bool,
};

export default MyProfileButton;
