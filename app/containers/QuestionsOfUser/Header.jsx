import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import Wrapper from 'components/Header/Complex';

const Header = ({ userId, account, displayName }) => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3" position="bottom">
      <H3>
        {t(
          `common.${
            account && userId === account ? 'youAsked' : 'somebodyAsked'
          }`,
          {
            account: displayName,
          },
        )}
      </H3>
    </Wrapper>
  );
};

Header.propTypes = {
  account: PropTypes.string,
  userId: PropTypes.string,
  displayName: PropTypes.string,
};

export default React.memo(Header);
