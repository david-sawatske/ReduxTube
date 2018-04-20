import { connect } from 'react-redux';

import { requestVideoSearch } from '../../actions/search_actions.js';

import SearchBar from './search_bar';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  requestVideoSearch: term => dispatch(requestVideoSearch(term))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
