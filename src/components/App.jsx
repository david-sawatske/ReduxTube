import React, { Component } from 'react';

import PlaylistShow from './playist/playlist_show_container';
import Header from './header/app-header';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <PlaylistShow />
      </div>
    );
  }
}
