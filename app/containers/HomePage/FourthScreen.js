import React from 'react';
import styled from 'styled-components';

import * as plus from 'images/Plus.png';
import * as minus from 'images/Minus.png';
import * as arrRight from 'images/arrRight.svg';

import { FOURTH_SCREEN } from './constants';

const Box = styled.section`
  display: flex;
  justify-content: center;
  padding: 60px 0;
  background-color: #fff;

  .fourth-screen-faq {
    display: flex;
    flex-direction: column;
    flex-basis: 60%;

    .card {
      border: none;

      .card-header {
        background: transparent;

        button {
          display: flex;
          align-items: center;
          outline: none;
          font-size: 30px;
          color: #282828;
          font-weight: bold;
          line-height: 40px;
          padding: 10px 0;
          cursor: pointer;

          .icon {
            background-size: cover;
            width: 30px;
            height: 30px;
            margin: 0 15px 3px 0;
          }
        }

        button[aria-expanded='true'] .icon.icon-collapse {
          background: url(${minus}) no-repeat;
        }

        button[aria-expanded='false'] .icon.icon-collapse {
          background: url(${plus}) no-repeat;
        }
      }
    }

    .card.get-more-answers .card-header {
      border: none;
      button {
        color: #fa8072 !important;
      }
    }
  }
`;

const FourthScreen = () => (
  <Box id={FOURTH_SCREEN}>
    <div className="fourth-screen-faq" id="accordion">
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span className="icon icon-collapse" />
              <span className="text">What is Peerania?</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseOne"
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span className="icon icon-collapse" />
              <span className="text">How do I create an account?</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              <span className="icon icon-collapse" />
              <span className="text">How do I upvote a post or comment?</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseThree"
          className="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingFour">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              <span className="icon icon-collapse" />
              <span className="text">What can users post to Peerania?</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseFour"
          className="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingFive">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              <span className="icon icon-collapse" />
              <span className="text">
                Can I earn Crypto Tokens for commenting?
              </span>
            </button>
          </h5>
        </div>
        <div
          id="collapseFive"
          className="collapse"
          aria-labelledby="headingFive"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header" id="headingSix">
          <h5 className="mb-0">
            <button
              data-toggle="collapse"
              data-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              <span className="icon icon-collapse" />
              <span className="text">What is Reputation?</span>
            </button>
          </h5>
        </div>
        <div
          id="collapseSix"
          className="collapse"
          aria-labelledby="headingSix"
          data-parent="#accordion"
        >
          <div className="card-body">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            maiores porro rem necessitatibus dolorem fugit odio voluptatum
            sapiente nobis eum nam aperiam ut explicabo, optio aliquam,
            inventore provident! Repellat libero iusto cumque corporis facere
            eveniet harum quis, perferendis assumenda doloribus. Adipisci hic
            molestias assumenda fugiat eos, animi ex pariatur error iusto ipsam.
            Aliquam mollitia, ipsam, at, porro possimus architecto nihil odio
            ullam delectus ducimus molestiae vitae, assumenda expedita tenetur
            nesciunt velit nisi soluta dolores magni officiis ea. Eos, modi
            voluptas? Odio ad vero, voluptates nulla sequi ullam provident totam
            dolor obcaecati in praesentium, molestiae culpa voluptatibus
            doloribus eius aut, quia.
          </div>
        </div>
      </div>
      <div className="card get-more-answers">
        <div className="card-header">
          <h5 className="mb-0">
            <a href="/">
              <button>
                <img className="icon" src={arrRight} alt="arrRight" />
                <span className="text">Get more answers</span>
              </button>
            </a>
          </h5>
        </div>
      </div>
    </div>
  </Box>
);

export default FourthScreen;
