import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { setSearchIdxClass, requestVideoSearch } = this.props;

    const term = this.state.term;

    requestVideoSearch(term).then(() => {
      setSearchIdxClass(null, true)
    })
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

          <input type="image"
                 name="submit"
                 src="http://res.cloudinary.com/sawatskeda10/image/upload/v1524591921/search_qy6dny.png" />
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
