import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

const ScatterInstaller = props => (
  <Wrapper>
    <p>
      To complete this action in our app you need to install{' '}
      <a
        href="https://chrome.google.com/webstore/detail/scatter/ammjpmhgckkpcamddpolhchgomcojkle"
        target="_blank"
      >
        <h4>Scatter</h4>
      </a>
    </p>
    <button className="btn btn-link form-control" onClick={props.children}>
      Next step
    </button>
  </Wrapper>
);

ScatterInstaller.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ScatterInstaller;
