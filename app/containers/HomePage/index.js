/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { connectToWallet, getSelectedAccount } from 'utils/eosio';

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      isWalletAvailable: null,
      selectedAccount: 'not set',
    };
  }

  async componentDidMount() {
    const connected = await connectToWallet();
    this.setState({ isWalletAvailable: connected });

    const account = await getSelectedAccount();
    this.setState({ selectedAccount: JSON.stringify(account) });
  }

  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <h2>
          Wallet Available:{' '}
          {this.state.isWalletAvailable ? 'available' : 'not available'}
        </h2>
        <h2>Selected Account: {this.state.selectedAccount}</h2>
      </div>
    );
  }
}
