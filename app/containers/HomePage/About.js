import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import practicalAnswers from 'images/Ico_01.svg';
import fairEconomy from 'images/Ico_02.svg';
import builtOnSmart from 'images/Ico_03.svg';

import simpleAndAffordable from 'images/1.png';
import helpfulAndGenerous from 'images/2.png';
import profitableAndModern from 'images/3.png';
import worthyAndPrestig from 'images/4.png';
import honorableAndFascinating from 'images/5.png';

import { SECOND_SCREEN, ANIMATE_IMAGE } from './constants';
import messages from './messages';

import Section from './Section';
import Gradient from './Gradient';

const Box = Section.extend`
  scroll-behavior: smooth;
  text-align: center;
  background-color: #fff;

  .second-screen-header {
    padding-bottom: 81px;
  }

  .main-difference {
    padding-bottom: 170px;

    li {
      letter-spacing: -0.7px;
      font-size: 18px;
      color: #282828;

      .card {
        border: none;
        .card-body {
          padding: 0;
        }
      }

      img {
        height: 81px;
      }

      .item-title {
        font-size: 18px;
        padding: 31px 0 26px 0;
        font-family: OpenSansBold !important;
      }

      .item-content {
        font-size: 18px;
        font-family: OpenSans;
        padding: 0 3.25rem;
      }
    }
  }

  .second-screen-elements .list-items {
    li:nth-child(even) {
      .block1 {
        order: 2;
      }
      .block2 {
        order: 1;

        .row {
          padding: 0 55px 0 35px;
        }
      }
    }

    li {
      padding-top: 80px;
      display: flex;
      align-items: center;

      > * {
        text-align: left;
      }

      .block2 {
        display: flex;
        align-items: center;

        .row {
          padding: 0 35px 0 55px;
        }

        img {
          width: 100%;
          padding-top: 30px;
          padding-bottom: 30px;
        }
      }

      .block1 {
        img {
          width: 90%;
          position: relative;
          transform: translate(0, 0);
          transition: 1.5s;
        }
      }

      .text-1 {
        font-family: OpenSans;
        color: #fa8072;
        font-size: 16px;
        letter-spacing: -0.6px;
      }

      .text-2 {
        color: #282828;
        font-size: 30px;
        font-family: OpenSansBold !important;
        padding-top: 19px;
        padding-bottom: 32px;
        letter-spacing: -1.2px;
      }

      .text-3 {
        font-family: OpenSans;
        text-align: left;
        color: #282828;
        font-size: 20px;
        letter-spacing: -0.8px;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .second-screen-header {
      padding-bottom: 0;
    }

    .main-difference {
      li {
        padding-top: 75px;
        padding-bottom: 0;
      }
    }

    .second-screen-elements .list-items {
      li {
        padding-top: 80px;

        .block1 {
          margin: 40px 0;
          text-align: center;
        }

        .text-3 {
          text-align: justify;
        }

        .block1,
        .block2 {
          order: 0 !important;

          .row {
            padding: 0 !important;
          }
        }
      }
    }
  }
`;

const About = () => (
  <Box id={SECOND_SCREEN}>
    <Gradient>
      <div className="container second-screen">
        <h3 className="col-lg-12 second-screen-header">
          <FormattedMessage {...messages.differentThan} />
        </h3>
        <div className="row second-screen-elements">
          <ul className="col-lg-12 main-difference">
            <div className="row">
              <li className="col-lg-4">
                <div className="card row">
                  <div className="col-lg-12">
                    <img src={practicalAnswers} alt="practicalAnswers" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.practicalAnswers} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.sitesAreModerated} />
                    </p>
                  </div>
                </div>
              </li>
              <li className="col-lg-4">
                <div className="card row">
                  <div className="col-lg-12">
                    <img src={fairEconomy} alt="fairEconomy" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.fairEconomy} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.postsOnQA} />
                    </p>
                  </div>
                </div>
              </li>
              <li className="col-lg-4">
                <div className="card row">
                  <div>
                    <img src={builtOnSmart} alt="builtOnSmart" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.builtOnSmart} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.platformIsDistributed} />
                    </p>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </Gradient>

    <div className="container second-screen">
      <div className="row second-screen-elements">
        <ul className="col-lg-12 list-items">
          <div className="row">
            <li className="col-lg-12">
              <div className="row">
                <div className="d-none d-md-block col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={simpleAndAffordable}
                    alt="simpleAndAffordable"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.simpleAndAffordable} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.getHelp} />
                    </h5>
                    <div className="d-block d-md-none col-lg-12">
                      <img
                        src={simpleAndAffordable}
                        alt="simpleAndAffordable"
                      />
                    </div>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.askQuestionAndGetHelp} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="d-none d-md-block col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={helpfulAndGenerous}
                    alt="helpfulAndGenerous"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.helpfulAndGenerous} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.shareKnowledge} />
                    </h5>
                    <div className="d-block d-md-none col-lg-12">
                      <img src={helpfulAndGenerous} alt="helpfulAndGenerous" />
                    </div>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.helpCommunity} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="d-none d-md-block col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={profitableAndModern}
                    alt="profitableAndModern"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.profitableAndModern} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.getPaidInCrypto} />
                    </h5>
                    <div className="d-block d-md-none col-lg-12">
                      <img
                        src={profitableAndModern}
                        alt="profitableAndModern"
                      />
                    </div>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage
                        {...messages.getPaidInCryptoFromWeekly}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="d-none d-md-block col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={worthyAndPrestig}
                    alt="worthyAndPrestig"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.worthyAndPrestig} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.earnReputation} />
                    </h5>
                    <div className="d-block d-md-none col-lg-12">
                      <img src={worthyAndPrestig} alt="worthyAndPrestig" />
                    </div>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.whetherYouAsk} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li className="col-lg-12">
              <div className="row">
                <div className="d-none d-md-block col-lg-6">
                  <img
                    className={ANIMATE_IMAGE}
                    src={honorableAndFascinating}
                    alt="honorableAndFascinating"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className="row">
                    <h5 className="col-lg-12 text-1">
                      <FormattedMessage {...messages.honorableAndFascinating} />
                    </h5>
                    <h5 className="col-lg-12 text-2">
                      <FormattedMessage {...messages.ruleThePlatform} />
                    </h5>
                    <div className="d-block d-md-none col-lg-12">
                      <img
                        src={honorableAndFascinating}
                        alt="honorableAndFascinating"
                      />
                    </div>
                    <p className="col-lg-12 text-3">
                      <FormattedMessage {...messages.participateInModeration} />
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </Box>
);

About.propTypes = {
  translations: PropTypes.object,
};

export default About;
