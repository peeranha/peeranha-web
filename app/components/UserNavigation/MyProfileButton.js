import React from 'react';
import PropTypes from 'prop-types';

import A from 'components/A';
import Button from 'components/Button';

const MyProfileButton = ({ account, userId, href, children }) => {
  if (account !== userId) {
    return null;
  }

  return (
    <A to={href} href={href}>
      <Button isLink={window.location.pathname !== href}>
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
};

export default MyProfileButton;
