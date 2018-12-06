import React from 'react';
import styled from 'styled-components';

import Parallax from './Parallax';
import { THIRD_SCREEN } from './constants';

const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 60px 0 50px 0;

  .content {
    display: flex;
    flex-basis: 60%;
    flex-direction: column;

    .title {
      color: #ffffff;
      font-weight: bold;
      font-size: 45px;
      text-align: center;
      line-height: 55px;
    }
    .content-body {
      color: #ffffff;
      font-size: 20px;
      line-height: 30px;
      text-align: center;
      padding: 50px 0;
    }
  }
`;

const ThirdScreen = () => (
  <Parallax id={THIRD_SCREEN}>
    <div className="layers">
      <div className="pattern pattern-1">
        <div className="inner" />
      </div>
    </div>
    <Box>
      <div className="content">
        <h3 className="title">
          Be the first to join and earn up to 100x more rewards
        </h3>
        <p className="content-body">
          Rewards pool is distributed weekly between all of the contributors for
          the given week. Members that join early get higher rewards while
          community is growing.
        </p>
        <p className="bottom-level">
          <form className="get-started-form">
            <input placeholder="Your email address" type="text" />
            <button type="submit">Get reward</button>
          </form>
        </p>
      </div>
    </Box>
  </Parallax>
);

export default ThirdScreen;
