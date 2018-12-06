import React from 'react';

import * as img1 from 'images/Ico_01.svg';
import * as img2 from 'images/Ico_02.svg';
import * as img3 from 'images/Ico_03.svg';

import * as img11 from 'images/1.png';
import * as img22 from 'images/2.png';
import * as img33 from 'images/3.png';
import * as img44 from 'images/4.png';
import * as img55 from 'images/5.png';

import styled from 'styled-components';

import { SECOND_SCREEN } from './constants';

const Box = styled.section`
  scroll-behavior: smooth;
  padding: 10vh 5vw;
  text-align: center;
  background-color: #fff;

  .second-screen-header {
    font-size: 30px;
    font-weight: bold;
  }
  .second-screen-elements {
    > * {
      margin: 10vh auto 0 auto;
    }
  }
  .main-difference {
    display: flex;
    flex-wrap: nowrap;
    li {
      flex: 1;
      img {
        margin-bottom: 30px;
      }
      .item-title {
        font-size: 18px;
        font-weight: bold;
        max-width: 75%;
        margin: 0 auto 15px auto;
        color: #282828;
      }
      .item-content {
        font-size: 18px;
        line-height: 28px;
        color: #282828;
      }
    }
  }
  .second-screen-elements-column {
    display: flex;
    flex-direction: column;

    > * {
      margin-bottom: 40px;
    }

    li:nth-child(even) {
      .block1 {
        order: 2;
      }
      .block2 {
        order: 1;
      }
    }

    li {
      display: flex;
      align-items: center;
      flex-direction: row;
      > * {
        flex: 1;
        text-align: left;
      }
      .text-1 {
        color: #fa8072;
        font-size: 16px;
        margin-bottom: 15px;
      }
      .text-2 {
        color: #282828;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 30px;
        line-height: 40px;
      }
      .text-3 {
        color: #282828;
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
`;

const SecondScreen = () => (
  <Box id={SECOND_SCREEN}>
    <div className="container second-screen">
      <h3 className="second-screen-header">
        Different than other Question and Answers sites
      </h3>
      <p className="second-screen-elements">
        <ul className="main-difference">
          <li>
            <img src={img1} alt="img1" />
            <p className="item-title">Practical Answers and Questions</p>
            <p className="item-content">
              Sites are moderated by community. Only detailed questions and
              answers to very practical questions are allowed.
            </p>
          </li>
          <li>
            <img src={img2} alt="img2" />
            <p className="item-title">Fair economy where users are paid</p>
            <p className="item-content">
              Posts on Q&A websites save millions of people many hours of work.
              We believe that people should be paid for helpful contributions to
              community.
            </p>
          </li>
          <li>
            <img src={img3} alt="img3" />
            <p className="item-title">
              Built on Smart Contracts and Blockchain
            </p>
            <p className="item-content">
              The platform is distributed built on blockchain and IPFS
              technologies. Platforms rules and economy are built into smart
              contract.
            </p>
          </li>
        </ul>
        <ul className="second-screen-elements-column">
          <li>
            <p className="block1">
              <img src={img11} width="90%" alt="img11" />
            </p>
            <p className="block2">
              <h5 className="text-1">Simple and affordable</h5>
              <h5 className="text-2">Get Help and Help Others</h5>
              <p className="text-3">
                Ask questions and get help from community of experts passionate
                about the topic. And help thousands of other peers who get
                answer to the question in minutes instead of hours thanks to
                your post.
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img22} width="90%" alt="img22" />
            </p>
            <p className="block2">
              <h5 className="text-1">Helpful and generous</h5>
              <h5 className="text-2">Share Knowledge</h5>
              <p className="text-3">
                Help community by answering question of your peers. Your answer
                remains there for many others that need the same answer.
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img33} width="90%" alt="img33" />
            </p>
            <p className="block2">
              <h5 className="text-1">Profitable and modern</h5>
              <h5 className="text-2">
                Get Paid in Crypto Token. Token with Value. Residually.
              </h5>
              <p className="text-3">
                Get paid in crypto from the weekly reward pool for your
                contributions, asking and answering question. Token can be sold
                on the open market to users willing to advertise or post job
                openings on the platform. You continue to be paid for your
                contributions as long as your content is helpful and being
                upvoted by the community.
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img44} width="90%" alt="img44" />
            </p>
            <p className="block2">
              <h5 className="text-1">Worthy and prestigious</h5>
              <h5 className="text-2">Earn Reputation</h5>
              <p className="text-3">
                Whether you ask or answer questions, all contributions count.
                Earn reputation and recognition in the community. Unlock new
                privileges as your reputation grows.
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img55} width="90%" alt="img55" />
            </p>
            <p className="block2">
              <h5 className="text-1">Honorable and fascinating</h5>
              <h5 className="text-2">Rule the Platform</h5>
              <p className="text-3">
                Participate in moderation of the community and help community to
                thrive. Success of community directly impacts the value of token
                on the market. Propose, vote for or even build upgrades for the
                platform. The platform is open source and decentralized. Owned
                by you and your community.
              </p>
            </p>
          </li>
        </ul>
      </p>
    </div>
  </Box>
);

export default SecondScreen;
