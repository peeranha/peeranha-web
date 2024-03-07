import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { graphCommunityColors } from 'utils/communityManagement';

import Wrapper from 'components/Header/Complex';
import H3 from 'components/H3';

const graphCommunity = graphCommunityColors();

const Header = ({ account, userId, displayName }) => {
  const { t } = useTranslation();

  return (
    <Wrapper
      className="mb-to-sm-0 mb-from-sm-3"
      position="bottom"
      css={graphCommunity && { border: 'none', background: 'none' }}
    >
      <H3>
        {t(`common.${account && userId === account ? 'youAnswered' : 'somebodyAnswered'}`, {
          account: displayName,
        })}
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
