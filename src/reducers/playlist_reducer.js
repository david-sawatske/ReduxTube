import { combineReducers } from 'redux';

import { VIDEO_REMOVE, VIDEO_ADD  } from '../actions/playlist_actions';

const defState = [
  {
    "id": "2HuJNI_FOMo",
    "title": "After Effects Tutorial: Beautiful Timelapse",
    "description": "Open Description [click 'show more'] for info! Keep the creative mind flowing! Please read more! ---------------------------------------------------- Add my new Snapchat! ➤Snapchat: BehrSnaps...",
    "thumbnail": "https://i.ytimg.com/vi/2HuJNI_FOMo/hqdefault.jpg"
  },
  {
    "id": "8gD_9WPPFb4",
    "title": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars",
    "description": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars. Dreamlapse is a time lapse film with relaxing music, soothing sunsets, stars & clouds. Buy and download the film in original 4K quality...",
    "thumbnail": "https://i.ytimg.com/vi/8gD_9WPPFb4/hqdefault.jpg"
  },
  {
    "id": "apLevp7QI8E",
    "title": "Alone in a Peaceful dream - Relaxing music playlist with Beautiful time-lapse videos [+1 Hour]",
    "description": "Calm and inspirational relaxing music pieces that might fit your studying, thinking or mental work. This is what heaven would sound like. 1- 0:00 Extremely loud and incredibly close -...",
    "thumbnail": "https://i.ytimg.com/vi/apLevp7QI8E/hqdefault.jpg"
  },
  {
    "id": "8dTzy_N0Pn4",
    "title": "The World is Beautiful (Timelapse & Hyperlapse)",
    "description": "Check out my other videos: Life is Awesome (#3) - http://youtu.be/5D5nsw3PMxc Life is Awesome (#2) - http://youtu.be/3nDGQj8hxn8 Life is Awesome - http://youtu.be/sWRCcJCnB48 Best of Parkour...",
    "thumbnail": "https://i.ytimg.com/vi/8dTzy_N0Pn4/hqdefault.jpg"
  },
  {
    "id": "KgMpKsp23yY",
    "title": "Beautiful Planet Earth || Nature In Motion - Timelapse Compilation 2017 ||  Oddly Satisfying Video",
    "description": "I wanted to create a slightly different compilations of known \"Satisfying Compilation\" I hope I did and appreciate my work put into this video. I invite you to watch in 1440p :) - Watch, rate,...",
    "thumbnail": "https://i.ytimg.com/vi/KgMpKsp23yY/hqdefault.jpg"
  },
  {
    "id": "9d8wWcJLnFI",
    "title": "Dazzling Time-Lapse Reveals America's Great Spaces | National Geographic",
    "description": "October 23, 2013—After quitting a comfortable day job, photographer Shane Black spent two months on the road shooting time-lapses of some of America's most beautiful spots. His \"Adventure...",
    "thumbnail": "https://i.ytimg.com/vi/9d8wWcJLnFI/hqdefault.jpg"
  },
  {
    "id": "qjH7LgRH2pE",
    "title": "Beautiful Planet Earth 2015 - Timelapse",
    "description": "The most beautiful places of the world video compilation. Beautiful Planet Earth Support The Sound Project: https://www.facebook.com/The-Sound-Project-304068123119291/ https://plus.google.com/b/10...",
    "thumbnail": "https://i.ytimg.com/vi/qjH7LgRH2pE/hqdefault.jpg"
  },
  {
    "id": "AHrCI9eSJGQ",
    "title": "30 Days Timelapse at Sea | 4K | Through Thunderstorms, Torrential Rain & Busy Traffic",
    "description": "30 Days of Timelapse, about 80000 photos combined. 1500GB of Project files. Sailing in the open ocean is a unique feeling and experience.I hope to capture and share it for everyone to see....",
    "thumbnail": "https://i.ytimg.com/vi/AHrCI9eSJGQ/hqdefault.jpg"
  },
  {
    "id": "8gD_9WPPFb4",
    "title": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars",
    "description": "HD Video 1080p - Time Lapse with Sunsets, Clouds, Stars. Dreamlapse is a time lapse film with relaxing music, soothing sunsets, stars & clouds. Buy and download the film in original 4K quality...",
    "thumbnail": "https://i.ytimg.com/vi/8gD_9WPPFb4/hqdefault.jpg"
  }
]

const playlist = (state = defState, action) => {
  Object.freeze(state)

  switch (action.type) {
  case VIDEO_REMOVE:
    return state.filter( vid => vid != action.video);
  case VIDEO_ADD:
    return [...new Set([...state, action.video])];
  default:
    return state;
  }
};

const PlaylistReducer = combineReducers({
  playlist
});


export default PlaylistReducer;
