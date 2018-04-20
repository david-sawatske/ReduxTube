import React, { Component } from 'react';
import SearchBar from './search/search_bar_container.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>ReduxTube</h1>
        <SearchBar />
      </div>
    );
  }
}
