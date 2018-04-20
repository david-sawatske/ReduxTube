import $ from 'jquery';

const API_DATA = {
  API_KEY: 'AIzaSyAnIwax8vSDFdTpWnYrHNKsBxIQRheoeUY',
  SEARCH_URL: 'https://www.googleapis.com/youtube/v3/search',
};

export const fetchVideoSearch = term => (
  $.ajax({
    url : API_DATA.SEARCH_URL,
    data: {
      part      : 'id,snippet',
      fields    : 'items/id/videoId,items/snippet/title,items/snippet/description,items/snippet/thumbnails/high',
      maxResults: '20',
      key       : API_DATA.API_KEY,
      q         : term
    }
  })
)
