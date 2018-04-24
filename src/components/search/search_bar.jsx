import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: 'beautiful timelapse' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const term = this.state.term;

    this.props.requestVideoSearch(term);
  }

  handleSubmit(event) {
    event.preventDefault();

    const term = this.state.term;

    this.props.requestVideoSearch(term);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit} >
          <input
            type="text"
            placeholder="Search"
            value={this.state.term}
            onChange={this.update('term')} />

          <input type="submit"
                 value=" 🔍 " />
        </form>
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
