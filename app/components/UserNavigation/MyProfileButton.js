import React from 'react';
import PropTypes from 'prop-types';

import A from 'components/A';
import NavigationButton from 'components/Button/NavigationButton';

const MyProfileButton = ({ account, userId, href, children, disabled }) => {
  if (account !== userId) {
    return null;
  }

  return (
    <A to={href} href={href}>
      <NavigationButton
        disabled={disabled}
        isLink={window.location.pathname !== href}
      >
        {React.Children.toArray(children)}
      </NavigationButton>
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
