import React from 'react';
import PropTypes from 'prop-types';

const ScatterInstaller = props => (
  <div>
    <p>
      To complete this action in our app you need to install{' '}
      <a
        href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
        target="_blank"
      >
        Scatter
      </a>
    </p>
    <button onClick={props.children}>Next step</button>
  </div>
);

ScatterInstaller.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ScatterInstaller;
