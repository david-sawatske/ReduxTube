import { connect } from 'react-redux';

import { addVideo, removeVideo,
         populatePlaylist } from '../../actions/playlist_actions';
import { requestVideoSearch } from '../../actions/search_actions';

import PlaylistShow from './playlist_show';

const mapStateToProps = state => ({
  allSearchedIds: state.searched.allSearchedIds,
  searchedById: state.searched.searchedById,
  playlist: state.playlist.playlist
});

const mapDispatchToProps = dispatch => ({
  populatePlaylist: videoArray => dispatch(populatePlaylist(videoArray)),
  requestVideoSearch: term => dispatch(requestVideoSearch(term)),
  removeVideo: video => dispatch(removeVideo(video)),
  addVideo: video => dispatch(addVideo(video)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistShow);
