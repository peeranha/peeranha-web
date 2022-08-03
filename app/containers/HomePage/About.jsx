import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  LANDING_FONT,
  BG_LIGHT,
  TEXT_WARNING_LIGHT,
  TEXT_DARK,
} from 'style-constants';

import rewardingImg from 'images/rewarding.png';
import ownershipImg from 'images/ownership.png';
import valuingImg from 'images/valuing.png';

import simpleAndAffordable from 'images/1.png';
import helpfulAndGenerous from 'images/2.png';
import profitableAndModern from 'images/3.png';
import worthyAndPrestig from 'images/4.png';
import honorableAndFascinating from 'images/5.png';

import { SECOND_SCREEN, ANIMATE_IMAGE, ANIMATE_TEXT } from './constants';

import Section from './Section';
import Gradient from './Gradient';

const About = () => {
  const { t } = useTranslation();

  return (
    <Box id={SECOND_SCREEN}>
      <Gradient position="top">
        <div className="container second-screen">
          <h3 className="col-lg-12 second-screen-header">
            {t('about.differentThan')}
            <br />
            {t('about.differentThan2')}
          </h3>

          <ul className="row second-screen-elements main-difference">
            <li className="col-lg-4">
              <div className="card">
                <img src={rewardingImg} alt="rewardingImg" />
                <div className="card-body">
                  <h4 className="item-title">{t('about.rewardingUser')}</h4>
                  <p className="item-content">{t('about.peopleSaveHours')}</p>
                </div>
              </div>
            </li>

            <li className="col-lg-4">
              <div className="card">
                <img src={ownershipImg} alt="ownershipImg" />
                <div className="card-body">
                  <h4 className="item-title">{t('about.ownershipByUsers')}</h4>
                  <p className="item-content">
                    {t('about.peeranhaDecentralized')}
                  </p>
                </div>
              </div>
            </li>

            <li className="col-lg-4">
              <div className="card">
                <img src={valuingImg} alt="valuingImg" />
                <div className="card-body">
                  <h4 className="item-title">{t('about.earlyAdopters')}</h4>
                  <p className="item-content">
                    {t('about.peeranhaPhilosophy')}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Gradient>

      <div className="container second-screen">
        <div className="row second-screen-elements">
          <ul className="col-lg-12 list-items">
            <li className="row">
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
                    {t('about.simpleAndAffordable')}
                  </h5>
                  <h5 className="col-lg-12 text-2">{t('about.getHelp')}</h5>
                  <div className="d-block d-md-none col-lg-12">
                    <img src={simpleAndAffordable} alt="simpleAndAffordable" />
                  </div>
                  <p className="col-lg-12 text-3">
                    {t('about.askQuestionAndGetHelp')}
                  </p>
                </div>
              </div>
            </li>

            <li className="row">
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
                    {t('about.helpfulAndGenerous')}
                  </h5>
                  <h5 className="col-lg-12 text-2">
                    {t('about.shareKnowledge')}
                  </h5>
                  <div className="d-block d-md-none col-lg-12">
                    <img src={helpfulAndGenerous} alt="helpfulAndGenerous" />
                  </div>
                  <p className="col-lg-12 text-3">{t('about.helpCommunity')}</p>
                </div>
              </div>
            </li>

            <li className="row">
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
                    {t('about.profitableAndModern')}
                  </h5>
                  <h5 className="col-lg-12 text-2">
                    {t('about.getPaidInCrypto')}
                  </h5>
                  <div className="d-block d-md-none col-lg-12">
                    <img src={profitableAndModern} alt="profitableAndModern" />
                  </div>
                  <p className="col-lg-12 text-3">
                    {t('about.getPaidInCryptoFromWeekly')}
                  </p>
                </div>
              </div>
            </li>

            <li className="row">
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
                    {t('about.worthyAndPrestig')}
                  </h5>
                  <h5 className="col-lg-12 text-2">
                    {t('about.earnReputation')}
                  </h5>
                  <div className="d-block d-md-none col-lg-12">
                    <img src={worthyAndPrestig} alt="worthyAndPrestig" />
                  </div>
                  <p className="col-lg-12 text-3">{t('about.whetherYouAsk')}</p>
                </div>
              </div>
            </li>

            <li className="row">
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
                    {t('about.honorableAndFascinating')}
                  </h5>
                  <h5 className="col-lg-12 text-2">
                    {t('about.ruleThePlatform')}
                  </h5>
                  <div className="d-block d-md-none col-lg-12">
                    <img
                      src={honorableAndFascinating}
                      alt="honorableAndFascinating"
                    />
                  </div>
                  <p className="col-lg-12 text-3">
                    {t('about.participateInModeration')}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Box>
  );
};

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
        object-fit: contain;
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
    background: ${BG_LIGHT};

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
        color: ${TEXT_WARNING_LIGHT};
        font-size: 16px;
        letter-spacing: -0.6px;
      }

      .text-2 {
        color: ${TEXT_DARK};
        font-size: 30px;
        font-weight: 700;
        padding-top: 19px;
        padding-bottom: 32px;
        letter-spacing: -1.2px;
      }

      .text-3 {
        font-family: ${LANDING_FONT};
        text-align: left;
        color: ${TEXT_DARK};
        font-size: 18px;
        letter-spacing: -0.8px;
      }
    }

    li:nth-child(even) {
      .block1 {
        order: 2;
      }
      .block2 {
        order: 1;
      }
    }
  }

  @media only screen and (max-width: 992px) {
    .second-screen-header {
      padding-bottom: 0;
    }

    .main-difference {
      padding-bottom: 75px;

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
          text-align: left;
        }

        .block1,
        .block2 {
          order: 0 !important;
        }
      }
    }
  }
`;

export default React.memo(About);
