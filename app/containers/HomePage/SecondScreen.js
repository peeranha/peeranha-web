import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as img1 from 'images/Ico_01.svg';
import * as img2 from 'images/Ico_02.svg';
import * as img3 from 'images/Ico_03.svg';

import * as img11 from 'images/1.png';
import * as img22 from 'images/2.png';
import * as img33 from 'images/3.png';
import * as img44 from 'images/4.png';
import * as img55 from 'images/5.png';

import { SECOND_SCREEN } from './constants';
import messages from './messages';

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
  @media only screen and (max-width: 992px) {
    .second-screen-elements-column {
      > * {
        margin: 0;
      }
      li {
        flex-direction: column;
        > * {
          padding-bottom: 50px;
        }
        .block1 {
          order: 1;
        }
      }
    }
    .main-difference {
      flex-direction: column;
      li {
        padding-bottom: 50px;
      }
    }
  }
`;

const SecondScreen = () => (
  <Box id={SECOND_SCREEN}>
    <div className="container second-screen">
      <h3 className="second-screen-header">
        <FormattedMessage {...messages.differentThan} />
      </h3>
      <p className="second-screen-elements">
        <ul className="main-difference">
          <li>
            <img src={img1} alt="img1" />
            <p className="item-title">
              <FormattedMessage {...messages.practicalAnswers} />
            </p>
            <p className="item-content">
              <FormattedMessage {...messages.sitesAreModerated} />
            </p>
          </li>
          <li>
            <img src={img2} alt="img2" />
            <p className="item-title">
              <FormattedMessage {...messages.fairEconomy} />
            </p>
            <p className="item-content">
              <FormattedMessage {...messages.postsOnQA} />
            </p>
          </li>
          <li>
            <img src={img3} alt="img3" />
            <p className="item-title">
              <FormattedMessage {...messages.builtOnSmart} />
            </p>
            <p className="item-content">
              <FormattedMessage {...messages.platformIsDistributed} />
            </p>
          </li>
        </ul>
        <ul className="second-screen-elements-column">
          <li>
            <p className="block1">
              <img src={img11} width="90%" alt="img11" />
            </p>
            <p className="block2">
              <h5 className="text-1">
                <FormattedMessage {...messages.simpleAndAffordable} />
              </h5>
              <h5 className="text-2">
                <FormattedMessage {...messages.getHelp} />
              </h5>
              <p className="text-3">
                <FormattedMessage {...messages.askQuestionAndGetHelp} />
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img22} width="90%" alt="img22" />
            </p>
            <p className="block2">
              <h5 className="text-1">
                <FormattedMessage {...messages.helpfulAndGenerous} />
              </h5>
              <h5 className="text-2">
                <FormattedMessage {...messages.shareKnowledge} />
              </h5>
              <p className="text-3">
                <FormattedMessage {...messages.helpCommunity} />
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img33} width="90%" alt="img33" />
            </p>
            <p className="block2">
              <h5 className="text-1">
                <FormattedMessage {...messages.profitableAndModern} />
              </h5>
              <h5 className="text-2">
                <FormattedMessage {...messages.getPaidInCrypto} />
              </h5>
              <p className="text-3">
                <FormattedMessage {...messages.getPaidInCryptoFromWeekly} />
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img44} width="90%" alt="img44" />
            </p>
            <p className="block2">
              <h5 className="text-1">
                <FormattedMessage {...messages.worthyAndPrestig} />
              </h5>
              <h5 className="text-2">
                <FormattedMessage {...messages.earnReputation} />
              </h5>
              <p className="text-3">
                <FormattedMessage {...messages.whetherYouAsk} />
              </p>
            </p>
          </li>
          <li>
            <p className="block1">
              <img src={img55} width="90%" alt="img55" />
            </p>
            <p className="block2">
              <h5 className="text-1">
                <FormattedMessage {...messages.honorableAndFascinating} />
              </h5>
              <h5 className="text-2">
                <FormattedMessage {...messages.ruleThePlatform} />
              </h5>
              <p className="text-3">
                <FormattedMessage {...messages.participateInModeration} />
              </p>
            </p>
          </li>
        </ul>
      </p>
    </div>
  </Box>
);

SecondScreen.propTypes = {
  translations: PropTypes.object,
};

export default SecondScreen;
