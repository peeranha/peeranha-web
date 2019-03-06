import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { LANDING_FONT } from 'style-constants';

import rewardingImg from 'images/rewarding.png';
import ownershipImg from 'images/ownership.png';
import valuingImg from 'images/valuing.png';

import simpleAndAffordable from 'images/1.png';
import helpfulAndGenerous from 'images/2.png';
import profitableAndModern from 'images/3.png';
import worthyAndPrestig from 'images/4.png';
import honorableAndFascinating from 'images/5.png';

import { SECOND_SCREEN, ANIMATE_IMAGE, ANIMATE_TEXT } from './constants';
import messages from './messages';

import Section from './Section';
import Gradient from './Gradient';

const Box = Section.extend`
  scroll-behavior: smooth;
  text-align: center;

  .second-screen-header {
    padding-bottom: 81px;
  }

  .main-difference {
    padding-bottom: 170px;
    background: transparent;

    li {
      letter-spacing: -0.7px;
      font-size: 18px;
      color: #282828;

      * {
        background: transparent;
      }

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
      }

      .item-content {
        font-size: 18px;
        padding: 0 3.25rem;
      }
    }
  }

  .second-screen-elements .list-items {
    background: #fff;

    .${ANIMATE_IMAGE}, .${ANIMATE_TEXT} {
      transition: 1.5s;
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
        }
      }

      .text-1 {
        font-family: ${LANDING_FONT};
        color: #fa8072;
        font-size: 16px;
        letter-spacing: -0.6px;
      }

      .text-2 {
        color: #282828;
        font-size: 30px;
        font-weight: 700;
        padding-top: 19px;
        padding-bottom: 32px;
        letter-spacing: -1.2px;
      }

      .text-3 {
        font-family: ${LANDING_FONT};
        text-align: left;
        color: #282828;
        font-size: 20px;
        letter-spacing: -0.8px;
      }
    }

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
    <Gradient position="top">
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
                    <img src={rewardingImg} alt="rewardingImg" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.rewardingUser} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.peopleSaveHours} />
                    </p>
                  </div>
                </div>
              </li>
              <li className="col-lg-4">
                <div className="card row">
                  <div className="col-lg-12">
                    <img src={ownershipImg} alt="ownershipImg" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.ownershipByUsers} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.peeraniaDecentralized} />
                    </p>
                  </div>
                </div>
              </li>
              <li className="col-lg-4">
                <div className="card row">
                  <div>
                    <img src={valuingImg} alt="valuingImg" />
                  </div>
                  <div className="card-body">
                    <h4 className="item-title">
                      <FormattedMessage {...messages.earlyAdopters} />
                    </h4>
                    <p className="item-content">
                      <FormattedMessage {...messages.peeraniaPhilosophy} />
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
                  <div className={`row ${ANIMATE_TEXT}`}>
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
                  <div className={`row ${ANIMATE_TEXT}`}>
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
                  <div className={`row ${ANIMATE_TEXT}`}>
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
                  <div className={`row ${ANIMATE_TEXT}`}>
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
                <div className="d-none d-md-block col-lg-6 block1">
                  <img
                    className={ANIMATE_IMAGE}
                    src={honorableAndFascinating}
                    alt="honorableAndFascinating"
                  />
                </div>
                <div className="col-lg-6 block2">
                  <div className={`row ${ANIMATE_TEXT}`}>
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
