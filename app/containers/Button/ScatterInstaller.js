import React from 'react';
import PropTypes from 'prop-types';

import Button from './index';
import Wrapper from './Wrapper';

const ScatterInstaller = props => (
  <Wrapper>
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
      onClick={props.children.reloadApp}
    >
      Next step
    </button>
    <Button
      complete={props.children.type}
      buttonClass="btn btn-link w-50 d-block my-1 mx-auto py-2"
      buttonContent="< Back to options"
    />
  </Wrapper>
);

ScatterInstaller.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ScatterInstaller;
