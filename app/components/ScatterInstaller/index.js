import React from 'react';
import PropTypes from 'prop-types';

const ScatterInstaller = props => (
  <div>
    <p>To complete this action in our app you need to install</p>
    <h4 className="text-center">
      <a
        href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
        target="_blank"
      >
        Scatter
      </a>
    </h4>
    <button
      className="btn btn-secondary w-50 d-block my-2 mx-auto py-2"
      onClick={props.reloadApp}
    >
      Next step
    </button>
    <button
      onClick={props.backToOptions}
      className="btn btn-link w-50 d-block my-1 mx-auto py-2"
    >
      <small>{'< '} Back to options</small>
    </button>
  </div>
);

ScatterInstaller.propTypes = {
  reloadApp: PropTypes.func.isRequired,
  backToOptions: PropTypes.func.isRequired,
};

export default ScatterInstaller;
