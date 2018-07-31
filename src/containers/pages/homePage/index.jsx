import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class HomePage extends Component {
  render() {
    return (
      <FormattedMessage id="app.containers.pages.home.welcomeMessage" />
    );
  }
}

export default HomePage;
